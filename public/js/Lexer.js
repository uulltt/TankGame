//   TO DO LIST:
//        [X] Update reserved words to match actual reserved words.
//        [X] Update enumerated values for token use.
//        [X] Come up with a token system to flag specific types of statements. (Possibly values over 100?)
//        [X] Finish parsing functions.
//        [ ] Figure out a solution to system variables.
//        [ ] Create test cases.
//        [ ] ...


//   TEST CASE IDEAS:
//        [ ] Mulitple empty lines.
//        [ ] ...
//
//
//
var ifTokens = {
     "treadsGood" : 0,
     "treadsBad" : 1,
     "cantMove" : 2,
     "canMove" : 3,
     "hasFuel" : 4,
     "noFuel" : 5,
     "objSeen" : 6,
     "objUnseen" : 7,
     "enemySeen" : 8,
     "enemyUnseen" : 9,
     "enemyYonder" : 10,
     "lt" : 11,
     "eqlt" : 12,
     "not" : 13,
     "gtr" : 14,
     "eqgtr" : 15,
     "eq" : 16
}

//   Reserved words
var reservedWords = [
     "ANGLE", "AT", "BRANCH", "CLEAR", "CLOSEST", "DETECT", "DIRECTION", "DISTANCE",
     "DO", "EAST", "EMPTY", "ENEMY", "FIRE", "FOR", "FORWARD", "FRONT", "FUEL", "FUNCTIONAL",
     "LEFT", "MOVEMENT", "NONFUNCTIONAL", "NORTH", "OBJECT", "OBSTRUCTED", "OBSTRUCTION",
     "RANGE", "REMAINING", "RIGHT", "ROTATE", "SCAN", "SCANNER", "SEEN", "SHEILD",
     "SOUTH", "TANK", "THEN", "TO", "TREADS", "TURN", "UNAVAILABLE", "UNSEEN", "WEST", "WITHIN"
];

//   Tokens for the VM to manage.  The output of the Lexer/Parser will be a string
//   of these tokens along with Label identifiers, Variable identifiers, and number
//   values which will make the job of the VM much easier to convert into javascript.
const tokens = Object.freeze({
     VARDEC : 0, LABDEC : 1, IFSTATE : 2, MOVESTATE : 3,
     SCANSTATE : 4, TURNSTATE : 5, DETECTSTATE : 6, ROTATESTATE : 7,
     FIRESTATE : 8, VARID : 9, LABID : 10, NUMSYM : 11,
     PLUSSYM : 12, SUBSYM : 13, EQSYM : 14, LTSYM : 15,
     GTSYM : 16, LEQSYM : 17, GEQSYM : 19, NEQSYM : 20,
     FWDSYM : 21, BCKSYM : 22, NORSYM : 23, STHSYM : 24,
     ESTSYM : 25, WSTSYM : 26, ENEMYSYM : 27, OBJSYM : 28,
     RIGHTSYM : 29, LEFTSYM : 30, ANGLESYM : 31, SCANNERSYM : 32,
     FRNTSYM : 33, IFSYM : 34, DOSYM : 35, BRANCHSYM : 36, TREADSYM : 37,
     FUNCTSYM : 38, NONFUNCTSYM : 39, OBSTRUCTSYM : 40, CLEARSYM : 41,
     REMAINSYM : 42, EMPTYSYM : 43, CLOSESTSYM : 44, SEENSYM : 45,
     UNSEENSYM : 46, WITHINSYM : 47, RANGESYM : 48, FUELSYM : 49,
     DOSTATE: 50, BRANCHSTATE: 51
});

//   Array of regular expressions all representing the grammer of the language.
const classifiers = [
     // LABEL DECLARATION
     /(^|\n)[A-Z].{0,}/,
     // VARIABLE DECLARATION
     /\t[A-Z].{0,} = (([A-Z].{0,} \+ \d)|([A-Z].{0,} - \d)|(\d))/,
     // IF STATEMENT
     /\t(IF) (([A-Z].{0,} ((<)|(<=)|(<>)|(>)|(>=)|(=)) ((\d)|([A-Z].{0,})|([A-Z].{0,} \+ \d)|([A-Z].{0,} - \d)))|((TANK) (((TREADS) ((FUNCTIONAL)|(NONFUNCTIONAL)))|((MOVEMENT) ((OBSTRUCTED)|(CLEAR)))|((FUEL) ((REMAINING)|(EMPTY)))))|((CLOSEST) ((OBJECT) ((SEEN)|(UNSEEN))))|((ENEMY) (((SEEN)|(UNSEEN))|((WITHIN) (RANGE))))) (THEN) ((DO)|((BRANCH) (TO))) ([A-Z].{0,})/,
     // MOVE
     /\tMOVE ((NORTH)|(SOUTH)|(EAST)|(WEST)|(FORWARD)|(BACKWARD)|) \d/,
     // SCAN
     /\tSCAN (FOR) ((ENEMY)|(OBJECT))/,
     // TURN
     /\t((TURN) ((((RIGHT)|(LEFT)|((TO) (ANGLE))) (\d))|((TO) (SCANNER))))/,
     // DETECT
     /\tDETECT (OBSTRUCTION) (AT) ((FRONT)|(SCANNER)|((ANGLE) (\d)))/,
     // ROTATE
     /\tROTATE ((FRONT)|(((RIGHT)|(LEFT)|((TO) (ANGLE))) (\d)))/,
     // FIRE
     /\tFIRE (AT) ((ENEMY)|(OBSTRUCTION)|(OBJECT))/,
     // DO
     /\tDO (^|\n)[A-Z].{0,}/,
     //BRANCH TO
     /\tBRANCH TO (^|\n)[A-Z].{0,}/
]
function processLine(input)
{
     //   Split the input by space characters, and place into an array.
     var buf = input.split(' ');
     //   Remove the '\t' character at the beginning of the string.
     buf[0] = buf[0].substring(1, buf[0].length);

     return buf;
}
//   Binary search function to determine if input is a reserved word.
function isReservedWord(input, lo, hi)
{
     //   Get mid point of the Reserved Words Array.  Here we must use the floor
     //   function so we can use integer division.
     var mid = Math.floor(lo + (hi - lo) / 2);

     //   Base case.  If the hi pointer becomes less than or equal to the lo pointer
     //   then we have gone too far and the word is therefore not reserved.
     if(lo >= hi)
          return false;

     //   If we find the word in the Reserved Word array then the input is
     //   a reserved word.
     if(input === reservedWords[mid])
          return true;

     //   If the input is lexicographically less than the word pointed to by the
     //   middle pointer then the word is possibly lower in the array.
     else if(input < reservedWords[mid])
          return isReservedWord(input, 0, mid);

     //   Otherwise the word is possibly higher in the array.
     else(input > reservedWords[mid])
          return isReservedWord(input, mid + 1, hi);
}

//   Binary Search through reserved words.  If word not found then Label is valid.
//   Return label token concatenated with the value of the label.
//   Otherwise return Error Token and Error Message.
const labelDec = (input, index) =>
{
     console.log("Label Found");
     if(isReservedWord(input, 0, reservedWords.length - 1))
     {
          alert("ERROR: Label on line " + index + " is a reserved word!  Please use another label.")
          return -1;
     }

     return tokens.LABDEC + " " + input + " ";
}

//   Binary Search reserved words.  If word not found then variable name is
//   valid.  Return variable token concatenated with vaiable name and variable
//   value.  Otherwise return Error Token and Error Message.
const varDec = (input, index) =>
{
     console.log("Var Found");
     //   Split the input by space characters, and place into an array.
     var buf = processLine(input);
     var output = "";

     //   Check if declared variable is a reserved word.  If so, alert User and exit.
     if(isReservedWord(buf[0], 0, reservedWords.length - 1))
     {
          alert("ERROR: Variable name on line " + index + " is a reserved word!  Please use another variable name.")
          return -1;
     }

     //   At this point we know that the statement matches the syntax and the
     //   declared variable is not a reserved word.  Therefore, we can begin
     //   building our variable declaration string. Beginning with the Variable
     //   Declaration token to signify this line will be declaring a variable,
     //   followed by a token to signify a variable name is coming up. We then
     //   add the variable name.  This variable name will then be used as a key
     //   value in a hashmap on the VM side.
     output += tokens.VARDEC + " " + tokens.VARID + " " + buf[0] + " " + tokens.EQSYM + " ";

     //   A variable declaration statement follows 1 of 3 syntax patterns:
     //        myVar = otherVar + number
     //        myVar = otherVar - number
     //        myVar = number
     //   We can deduce which we may be dealing with by looking at the size of the buf array
     //   we made earlier.  If it is of size 3 we are dealing with a declaration of type:
     //        myVar = number
     if(buf.length == 3)
     {
          output += tokens.NUMSYM + " " + buf[2] + " ";
     }

     //   Otherwise we are dealing with either an addition or subtraction.
     else
     {
          if(buf[3] === "+")
               output += tokens.VARID + " " + tokens.PLUSSYM + " " + tokens.NUMSYM + " " + buf[buf.length - 1] + " ";
          else
               output += tokens.VARID + " " + tokens.SUBSYM + " " + tokens.NUMSYM + " " + buf[buf.length - 1] + " ";
     }

     return output;
}


//   This one is going to be tricky due to the number of different types of if
//   statements we will be dealing with.  One solution might be to march through
//   the input and assigning tokens depending on which type of if statement we are
//   dealing with.


// IF <VAR> <OP> <VALUE> THEN (DO || BRANCH TO) LABEL
// IF <VAR> <OP> (<VAR> + <VALUE>) THEN (DO || BRANCH TO) LABEL
// IF <VAR> <OP> (<VALUE> - <VALUE>) THEN (DO || BRANCH TO) LABEL

const ifState = (input, index) =>
{
     console.log("If Found");
     buf = processLine(input);


     // Possibly have to change conditionals to create labels for var <conditional> var
     let ifCompare = (statement) => {
          switch(statement[2])
          {
               case "<":
                    if(statement[5] === "DO")
                         return tokens.IFSYM + " " + ifTokens.lt + " " + statement[1] + " " + statement[3] + " " + tokens.DOSYM + " " + statement[statement.length - 1] + " ";
                    else if(statement[5] === "BRANCH")
                         return tokens.IFSYM + " " + ifTokens.lt + " " + statement[1] + " " + statement[3] + " " + tokens.BRANCHSYM + " " + statement[statement.length - 1] + " ";
                    else if(statement[4] === "+" )
                    {
                         if(statement[7] === "DO")
                              return tokens.IFSYM + " " + ifTokens.lt + " " + tokens.VARID + " " + statement[1] + " " + tokens.LTSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.PLUSSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.DOSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                         else
                              return tokens.IFSYM + " " + ifTokens.lt + " " + tokens.VARID + " " + statement[1] + " " + tokens.LTSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.PLUSSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.BRANCHSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    }
                    else
                    {
                         if(statement[7] === "DO")
                              return tokens.IFSYM + " " + ifTokens.lt + " " + tokens.VARID + " " + statement[1] + " " + tokens.LTSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.SUBSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.DOSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                         else
                              return tokens.IFSYM + " " + ifTokens.lt + " " + tokens.VARID + " " + statement[1] + " " + tokens.LTSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.SUBSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.BRANCHSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    }
                    break;
               case "<=":
                    if(statement[5] === "DO")
                         return tokens.IFSYM + " " + ifTokens.eqlt + " " + tokens.VARID + " " + statement[1] + " " + tokens.LEQSYM + " " + tokens.NUMSYM + " " + statement[3] + " " + tokens.DOSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    else if(statement[5] === "BRANCH")
                         return tokens.IFSYM + " " + ifTokens.eqlt + " " + tokens.VARID + " " + statement[1] + " " + tokens.LEQSYM + " " + tokens.NUMSYM + " " + statement[3] + " " + tokens.BRANCHSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    else if(statement[4] === "+" )
                    {
                         if(statement[7] === "DO")
                              return tokens.IFSYM + " " + ifTokens.eqlt + " " + tokens.VARID + " " + statement[1] + " " + tokens.LEQSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.PLUSSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.DOSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                         else
                              return tokens.IFSYM + " " + ifTokens.eqlt + " " + tokens.VARID + " " + statement[1] + " " + tokens.LEQSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.PLUSSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.BRANCHSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    }
                    else
                    {
                         if(statement[7] === "DO")
                              return tokens.IFSYM + " " + ifTokens.eqlt + " " + tokens.VARID + " " + statement[1] + " " + tokens.LEQSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.SUBSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.DOSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                         else
                              return tokens.IFSYM + " " + ifTokens.eqlt + " " + tokens.VARID + " " + statement[1] + " " + tokens.LEQSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.SUBSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.BRANCHSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    }
                    break;
               case "<>":
                    if(statement[5] === "DO")
                         return tokens.IFSYM + " " + ifTokens.not + " " + tokens.VARID + " " + statement[1] + " " + tokens.NEQSYM + " " + tokens.NUMSYM + " " + statement[3] + " " + tokens.DOSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    else if(statement[5] === "BRANCH")
                         return tokens.IFSYM + " " + ifTokens.not + " " + tokens.VARID + " " + statement[1] + " " + tokens.NEQSYM + " " + tokens.NUMSYM + " " + statement[3] + " " + tokens.BRANCHSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    else if(statement[4] === "+" )
                    {
                         if(statement[7] === "DO")
                              return tokens.IFSYM + " " + ifTokens.not + " " + tokens.VARID + " " + statement[1] + " " + tokens.NEQSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.PLUSSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.DOSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                         else
                              return tokens.IFSYM + " " + ifTokens.not + " " + tokens.VARID + " " + statement[1] + " " + tokens.NEQSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.PLUSSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.BRANCHSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    }
                    else
                    {
                         if(statement[7] === "DO")
                              return tokens.IFSYM + " " + ifTokens.not + " " + tokens.VARID + " " + statement[1] + " " + tokens.NEQSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.SUBSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.DOSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                         else
                              return tokens.IFSYM + " " + ifTokens.not + " " + tokens.VARID + " " + statement[1] + " " + tokens.NEQSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.SUBSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.BRANCHSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    }
                    break;
               case ">":
                    if(statement[5] === "DO")
                         return tokens.IFSYM + " " + ifTokens.gtr + " " + tokens.VARID + " " + statement[1] + " " + tokens.GTSYM + " " + tokens.NUMSYM + " " + statement[3] + " " + tokens.DOSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    else if(statement[5] === "BRANCH")
                         return tokens.IFSYM + " " + ifTokens.gtr + " " + tokens.VARID + " " + statement[1] + " " + tokens.GTSYM + " " + tokens.NUMSYM + " " + statement[3] + " " + tokens.BRANCHSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    else if(statement[4] === "+" )
                    {
                         if(statement[7] === "DO")
                              return tokens.IFSYM + " " + ifTokens.gtr + " " + tokens.VARID + " " + statement[1] + " " + tokens.GTSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.PLUSSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.DOSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                         else
                              return tokens.IFSYM + " " + ifTokens.gtr + " " + tokens.VARID + " " + statement[1] + " " + tokens.GTSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.PLUSSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.BRANCHSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    }
                    else
                    {
                         if(statement[7] === "DO")
                              return tokens.IFSYM + " " + ifTokens.gtr + " " + tokens.VARID + " " + statement[1] + " " + tokens.GTSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.SUBSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.DOSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                         else
                              return tokens.IFSYM + " " + ifTokens.gtr + " " + tokens.VARID + " " + statement[1] + " " + tokens.GTSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.SUBSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.BRANCHSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    }
                    break;
               case ">=":
                    if(statement[5] === "DO")
                         return tokens.IFSYM + " " + ifTokens.eqgtr + " " + tokens.VARID + " " + statement[1] + " " + tokens.GEQSYM + " " + tokens.NUMSYM + " " + statement[3] + " " + tokens.DOSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    else if(statement[5] === "BRANCH")
                         return tokens.IFSYM + " " + ifTokens.eqgtr + " " + tokens.VARID + " " + statement[1] + " " + tokens.GEQSYM + " " + tokens.NUMSYM + " " + statement[3] + " " + tokens.BRANCHSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    else if(statement[4] === "+" )
                    {
                         if(statement[7] === "DO")
                              return tokens.IFSYM + " " + ifTokens.eqgtr + " " + tokens.VARID + " " + statement[1] + " " + tokens.GEQSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.PLUSSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.DOSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                         else
                              return tokens.IFSYM + " " + ifTokens.eqgtr + " " + tokens.VARID + " " + statement[1] + " " + tokens.GEQSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.PLUSSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.BRANCHSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    }
                    else
                    {
                         if(statement[7] === "DO")
                              return tokens.IFSYM + " " + ifTokens.eqgtr + " " + tokens.VARID + " " + statement[1] + " " + tokens.GEQSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.SUBSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.DOSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                         else
                              return tokens.IFSYM + " " + ifTokens.eqgtr + " " + tokens.VARID + " " + statement[1] + " " + tokens.GEQSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.SUBSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.BRANCHSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    }
                    break;
               case "=":
                    if(statement[5] === "DO")
                         return tokens.IFSYM + " " + ifTokens.eq + " " + tokens.VARID + " " + statement[1] + " " + tokens.EQSYM + " " + tokens.NUMSYM + " " + statement[3] + " " + tokens.DOSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    else if(statement[5] === "BRANCH")
                         return tokens.IFSYM + " " + ifTokens.eq + " " + tokens.VARID + " " + statement[1] + " " + tokens.EQSYM + " " + tokens.NUMSYM + " " + statement[3] + " " + tokens.BRANCHSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    else if(statement[4] === "+" )
                    {
                         if(statement[7] === "DO")
                              return tokens.IFSYM + " " + ifTokens.eq + " " + tokens.VARID + " " + statement[1] + " " + tokens.EQSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.PLUSSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.DOSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                         else
                              return tokens.IFSYM + " " + ifTokens.eq + " " + tokens.VARID + " " + statement[1] + " " + tokens.EQSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.PLUSSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.BRANCHSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    }
                    else
                    {
                         if(statement[7] === "DO")
                              return tokens.IFSYM + " " + ifTokens.eq + " " + tokens.VARID + " " + statement[1] + " " + tokens.EQSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.SUBSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.DOSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                         else
                              return tokens.IFSYM + " " + ifTokens.eq + " " + tokens.VARID + " " + statement[1] + " " + tokens.EQSYM + " " + tokens.VARID + " " + statement[3] + " " + tokens.SUBSYM + " " + tokens.NUMSYM + " " + statement[5] + " " + tokens.BRANCHSYM + " " + tokens.LABID + " " + statement[statement.length - 1] + " ";
                    }
                    break;
               default:
                    console.log("WHY IS THIS HAPPENING?!?!?!  (In ifCompare)");
                    break;
          }
     }

     let ifTank = (statement) => {// treads not just tank
          if(statement[3] === "FUNCTIONAL")
          {
               if(statement[5] === "DO")
                    return tokens.IFSYM + " " + ifTokens.treadsGood + " " + tokens.DOSYM + " " + statement[statement.length - 1] + " ";
               else
                    return tokens.IFSYM + " " + ifTokens.treadsGood + " " + tokens.BRANCHSYM + " " + statement[statement.length - 1] + " ";
          }
          else
          {
               if(statement[5] === "DO")
                    return tokens.IFSYM + " " + ifTokens.treadsBad + " " + tokens.DOSYM + " " + statement[statement.length - 1] + " ";
               else
                    return tokens.IFSYM + " " + ifTokens.treadsBad + " " + tokens.BRANCHSYM + " " + statement[statement.length - 1] + " ";
          }
     }

     let ifMove = (statement) => {
          if(statement[3] === "OBSTRUCTED")
          {
               if(statement[5] === "DO")
                    return tokens.IFSYM + " " + ifTokens.cantMove + " " + tokens.DOSYM + " " + statement[statement.length - 1] + " ";
               else
                    return tokens.IFSYM + " " + ifTokens.cantMove + " " + tokens.BRANCHSYM + " " + statement[statement.length - 1] + " ";
          }
          else
          {
               if(statement[5] === "DO")
                    return tokens.IFSYM + " " + ifTokens.canMove + " " + tokens.DOSYM + " " + statement[statement.length - 1] + " ";
               else
                    return tokens.IFSYM + " " + ifTokens.canMove + " " + tokens.BRANCHSYM + " " + statement[statement.length - 1] + " ";
          }
     }

     let ifFuel = (statement) => {
          if(statement[3] === "REMAINING")
          {
               if(statement[5] === "DO")
                    return tokens.IFSYM + " " + ifTokens.hasFuel + " " + tokens.DOSYM + " " + statement[statement.length - 1] + " ";
               else
                    return tokens.IFSYM + " " + ifTokens.hasFuel + " " + tokens.BRANCHSYM + " " + statement[statement.length - 1] + " ";
          }
          else
          {
               if(statement[5] === "DO")
                    return tokens.IFSYM + " " + ifTokens.noFuel + " " + tokens.DOSYM + " " + statement[statement.length - 1] + " ";
               else
                    return tokens.IFSYM + " " + ifTokens.noFuel + " " + tokens.BRANCHSYM + " " + statement[statement.length - 1] + " ";
          }
     }

     let ifClosest = (statement) => {
          if(statement[3] === "SEEN")
          {
               if(statement[5] === "DO")
                    return tokens.IFSYM + " " + ifTokens.objSeen + " " + tokens.DOSYM + " " + statement[statement.length - 1] + " ";
               else
                    return tokens.IFSYM + " " + ifTokens.objSeen + " " + tokens.BRANCHSYM + " " + statement[statement.length - 1] + " ";
          }
          else
          {
               if(statement[5] === "DO")
                    return tokens.IFSYM + " " + ifTokens.objUnseen + " " + tokens.DOSYM + " " + statement[statement.length - 1] + " ";
               else
                    return tokens.IFSYM + " " + ifTokens.objUnseen + " " + tokens.BRANCHSYM + " " + statement[statement.length - 1] + " ";
          }
     }

     let ifEnemy = (statement) => {
          if(statement[2] === "SEEN")
          {
               if(statement[4] === "DO")
                    return tokens.IFSYM + " " + ifTokens.enemySeen + " " + tokens.DOSYM + " " + statement[statement.length - 1] + " ";
               else
                    return tokens.IFSYM + " " + ifTokens.enemySeen + " " + tokens.BRANCHSYM + " " + statement[statement.length - 1] + " ";
          }
          else if(statement[2] === "UNSEEN")
          {
               if(statement[4] === "DO")
                    return tokens.IFSYM + " " + ifTokens.enemyUnseen + " " + tokens.DOSYM + " " + statement[statement.length - 1] + " ";
               else
                    return tokens.IFSYM + " " + ifTokens.enemyUnseen + " " + tokens.BRANCHSYM + " " + statement[statement.length - 1] + " ";
          }
          else
          {
               if(statement[5] === "DO")
                    return tokens.IFSYM + " " + ifTokens.enemyYonder + " " + tokens.DOSYM + " " + statement[statement.length - 1] + " ";
               else
                    return tokens.IFSYM + " " + ifTokens.enemyYonder + " " + tokens.BRANCHSYM + " " + statement[statement.length - 1] + " ";
          }
     }

     //   Possible parenthesis issues here...
     const ifClassifiers = [
          /(IF) ([A-Z].{0,} ((<)|(<=)|(<>)|(>)|(>=)|(=)) ((\d)|([A-Z].{0,} \+ \d)|([A-Z].{0,} - \d)|([A-Z].{0,}))) (THEN) ((DO)|((BRANCH) (TO))) ([A-Z].{0,})/,
          /(IF) (TANK) (TREADS) ((FUNCTIONAL)|(NONFUNCTIONAL)) (THEN) ((DO)|((BRANCH) (TO))) ([A-Z].{0,})/,
          /(IF) (TANK) (MOVEMENT) ((OBSTRUCTED)|(CLEAR)) (THEN) ((DO)|((BRANCH) (TO))) ([A-Z].{0,})/,
          /(IF) ((TANK) (FUEL) ((REMAINING)|(EMPTY))) (THEN) ((DO)|((BRANCH) (TO))) ([A-Z].{0,})/,
          /(IF) ((CLOSEST) ((OBJECT) ((SEEN)|(UNSEEN)))) (THEN) ((DO)|((BRANCH) (TO))) ([A-Z].{0,})/,
          /(IF) ((ENEMY) (((SEEN)|(UNSEEN))|((WITHIN) (RANGE)))) (THEN) ((DO)|((BRANCH) (TO))) ([A-Z].{0,})/,
     ]

     var ifFunctions = [
          ifCompare, ifTank, ifMove, ifFuel, ifClosest, ifEnemy
     ]

     for(var i = 0; i < ifClassifiers.length; i++)
          if(input.match(ifClassifiers[i]) != undefined)
               return ifFunctions[i](buf);

     console.log("PANIC! (in ifState)");
     return -1;
}

//   Both the move direction and value should be at a specific index of the input
//   string.  Make sure to check for values greater than 9.
//   All values must be x such that 0 <= x <= 62. <--- Maybe Not???
const moveState = (input, index) =>
{
     console.log("Move Found");
     var buf = processLine(input);

     if(buf[1] === "FORWARD")
          return tokens.MOVESTATE + " " + tokens.FWDSYM + " " + tokens.NUMSYM + " " + buf[2] + " ";
     else if(buf[1] === "BACKWARD")
          return tokens.MOVESTATE + " " + tokens.BCKSYM + " " + tokens.NUMSYM + " " + buf[2] + " ";
}

//
const scanState = (input, index) =>
{
     console.log("Scan Found");
     var buf = processLine(input);

     if(buf[1] === "ENEMY")
          return tokens.SCANSTATE + " " + tokens.ENEMYSYM + " ";
     else
          return tokens.SCANSTATE + " " + tokens.OBJSYM + " ";
}

//   A turn statement can be 1 of 4 different syntax variations:
//        TURN RIGHT <VALUE>
//        TURN LEFT <VALUE>
//        TURN TO ANGLE <VALUE>
//        TURN TO SCANNER
const turnState = (input, index) =>
{
     console.log("Turn Found");
     var buf = processLine(input);
     if(buf[1] === "TO")
     {
          if(buf[2] === "SCANNER")
               return tokens.TURNSTATE + " " + tokens.SCANNERSYM + " ";
          else
               return tokens.TURNSTATE + " " + tokens.ANGLESYM + " " + tokens.NUMSYM + " " + buf[3] + " ";
     }
     else if(buf[1] === "RIGHT")
     {
          return tokens.TURNSTATE + " " + tokens.RIGHTSYM + " " + tokens.NUMSYM + " " + buf[4] + " ";
     }
     else
     {
          return tokens.TURNSTATE + " " + tokens.LEFTSYM + " " + tokens.NUMSYM + " " + buf[4] + " ";
     }
}

const detectState = (input, index) =>
{
     console.log("Detect Found");
     var buf = processLine(input);

     if (buf.length == 4)
     {
          if(buf[2] === "FRONT")
               return tokens.DETECTSTATE + " " + tokens.FRNTSYM + " ";
          else
               return tokens.DETECTSTATE + " " + tokens.SCANNERSYM + " ";
     }
     else
     {
          return tokens.DETECTSTATE + " " + tokens.ANGLESYM + " " + tokens.NUMSYM + " " + buf[4] + "";
     }
}

const rotateState = (input, index) =>
{
     console.log("Rotate Found");
     var buf = processLine(input);

     if(buf.length == 2)
     {
          return tokens.ROTATESTATE + " " + tokens.FRNTSYM + " ";
     }
     else
     {
          if(buf[1] === "LEFT")
               return tokens.ROTATESTATE + " " + tokens.LEFTSYM + " " + tokens.NUMSYM + " " + buf[2];
          else if(buf[1] === "RIGHT")
               return tokens.ROTATESTATE + " " + tokens.RIGHTSYM + " " + tokens.NUMSYM + " " + buf[2];
          else
               return tokens.ROTATESTATE + " " + tokens.ANGLESYM + " " + tokens.NUMSYM + " " + buf[2];
     }
}

const fireState = (input, index) =>
{
     console.log("Fire Found");
     var buf = processLine(input);

     if(buf[1] === "ENEMY")
          return tokens.FIRESTATE + " " + tokens.ENEMYSYM + " ";
     else if(buf[1] === "ENEMY")
               return tokens.FIRESTATE + " " + tokens.ENEMYSYM + " ";

}

const doState = (input, index) =>
{
     console.log("Do Found");
     var buf = processLine(input);

     return tokens.DOSTATE + " " + tokens.DOSYM + " " + tokens.LABID + " " + buf[buf.length - 1];
}

const doState = (input, index) =>
{
     console.log("Branch To Found");
     var buf = processLine(input);

     return tokens.BRANCHSTATE + " " + tokens.BRANCHSYM + " " + tokens.LABID + " " + buf[buf.length - 1];

}

//   Array of parsing functions for each type of statement.
const parsers = [
     labelDec, varDec, ifState, moveState, scanState,
     turnState, detectState, rotateState, fireState, doState,
     branchToState
]

//   We will probably have to have some sort of update method and have the system variables update based on each update.
var string = "EDGE\n\tL.ENEMYFOUND? = 0\n\tPOOP = 0\n\tL.MOVEDIR = 0\n\tMOVE FORWARD 5\n\tL.X = L.X + 8\n\tIF TANK FUEL EMPTY THEN BRANCH TO LABEL\nES.TEST";

//   Get some input from text field and process it.
function Lexer(input)
{
     var i, index = 0;
     var lines = input.split('\n');   //   This might not work properly.
     var output = "";

     for(var line of lines)
     {
          for(i = 0; i < classifiers.length; i++)
          {
               if (line == "" || line == "\t")  //skip blanks lines
               {
                    break;
               }
               if (line.match(classifiers[i]) != undefined)
               {
                    output += parsers[i](line, index + 1);
                    break;
               }
               //   If all classifiers have failed to parse then there is a Syntax Error!
               if (i == (classifiers.length - 1))
               {
                    alert("you effed up!");
                    return -1;
               }
          }
          index++;
     }
     return output;
};

// console.log("Output: " + Lexer(string));

function Parser (input) {
    let pc = 0;
    let num;
    let CompiledCode = {
        "LabelsLookup" : {},
        "LabelsPC" : [],
        "Code" : [],
        "Variables" : {}
    };
    let tokens = input.split(" ");
    console.log(tokens);
    for (let i = 0; i < tokens.length; i++) {
        num = parseInt(tokens[i])
        if (num || num == 0) { // token is able to be parsed as number
            tokens[i] = num;
        }
    }
    console.log(tokens);
    var tokenIndex = 0;
     // first pass label collection
    for (let i = 0; i < (tokens.length - 1); i++) {
          if (tokens[i] == 1) {
               CompiledCode.LabelsLookup[tokens[++i]] = tokenIndex++;
          }
    }
    let line;
    let type;
    //return;
    let variableCount = 0;
    let varName;
    for (let i = 0; i < (tokens.length - 1); i++) {
        type = undefined;
        console.log(tokens[i] + " " + i);
        line = undefined;
        switch (tokens[i]) {
            case 0:// variable dec
//                i += 2;
//                varName = tokens[i];
//                i += 2;
//                CompiledCode.Variables[varName] = variableCount++;
                break;
            // label dec
            // add label string to labels hashmap and store current pc
            // when branching to label lookup label string in hashmap and use stored pc
            case 1:
                i++;
                CompiledCode.LabelsPC[CompiledCode.LabelsLookup[tokens[i]]] = pc;
                break;
            // move state
            // check next token for direction F/B
            // check next token for amount
            case 3:
                let direction = tokens[++i];
                i += 2
                let distance = tokens[i];
                line = [3, 0];
                line[1] = (direction == 21) ? 1 : -1;
                if (distance > 0) {
                    for (let j = 0; j < distance; j++) {
                        CompiledCode.Code.push(line);
                        pc++;
                    }
                }
                break;
            // scan state
            // check next token for scan type
            // 0 == tank 1 == obstacle
            case 4:
                type = (tokens[++i] == 27) ? 0 : 1;
                line = [4, type];
                CompiledCode.Code.push(line);
                pc++;
                break;
            case 5:// turn state
                type = tokens[++i];
                line = [5, type];
                switch (type) {
                    case 32: // turn to scanner
                        break;
                    case 29: // turn to right
                    case 30: // turn to left
                    case 31: // turn to angle
                        i =+ 2
                        line.push(tokens[i]);
                        break;
                }
                CompiledCode.Code.push(line);
                pc++;
                break;
            case 6:// detect state
                break;
            case 7:// rotate gun state
                break;
            case 8:// fire state
                break;
            case 35: // just do state
                i++;
                if (CompiledCode.LabelsLookup.hasOwnProperty(tokens[i])) {
                    line = [35,CompiledCode.LabelsLookup[tokens[i]]];
                    CompiledCode.Code.push(line);
                    pc++;
                } else {
                    alert("Label Not Defined");
                }
                break;
            case 34:// if state
                    i++;
              line = [34, tokens[i]];
                    switch (tokens[i]) {
                        case 0:
               case 1:
                   line.push(tokens[++i]);
                   line.push(CompiledCode.LabelsLookup[tokens[++i]]);
                            break;
                        case 2:
               case 3:
                   line.push(tokens[++i]);
                   line.push(CompiledCode.LabelsLookup[tokens[++i]]);
                            break;
                        case 4:
                        case 5:
                   line.push(tokens[++i]);
                   line.push(CompiledCode.LabelsLookup[tokens[++i]]);
                            break;
                        case 6:
                        case 7:
                   line.push(tokens[++i]);
                   line.push(CompiledCode.LabelsLookup[tokens[++i]]);
                            break;
                        case 8:
                        case 9:
                   line.push(tokens[++i]);
                   line.push(CompiledCode.LabelsLookup[tokens[++i]]);
                            break;
                        case 10:
                   line.push(tokens[++i]);
                   line.push(CompiledCode.LabelsLookup[tokens[++i]]);
                            break;
                        case 11:
                   line.push(tokens[++i])
                            break;
                        case 12:
                            break;
                        case 13:
                            break;
                        case 14:
                            break;
                        case 15:
                            break;
                        case 16:
                            break;
                        case 17:
                            break;

                    }
              CompiledCode.Code.push(line);
                break;
            default:
                alert("bad state symbol" + tokens[i]);
                break;
        }
    }
    for (var i = 0; i < CompiledCode.Code.length - 1; i++) {
        if (CompiledCode.Code[i][0] == 35) {
             CompiledCode.Code[i][1] = CompiledCode.LabelsPC[CompiledCode.Code[i][1]];
        }
   }
   return CompiledCode;
   console.log(CompiledCode)
}
