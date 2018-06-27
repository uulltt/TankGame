

//   Reserved words
var reservedWords = [
     "ACTIVE", "ALIGN", "ALIGNED", "ALLY", "ARE", "ARMOR", "AT", "AVAILABLE", "BACKWARD", "BEEP", "BEING", "BEYOND",
     "BRANCH", "BREAK", "CLEAR", "CLOSEST", "CODE", "COMMLINK", "COPY", "DATA", "DESTRUCT", "DETECT", "DIRECTION", "DISTANCE",
     "DO", "DOWN", "EMPTY", "ENEMY", "FACE", "FACING", "FIRE", "FOR", "FORWARD", "FOUND", "FROM", "FUEL", "FUNCTIONAL", "GET",
     "GOSUB", "GOTO", "HQ", "IF", "INACTIVE", "INCLUDE", "INTERNAL", "IS", "JAM", "KEY", "KIT", "LAST", "LAUNCH", "LEFT", "LOCK",
     "LOCKED", "LOWER", "MOVE", "MOVEMENT", "NOT", "OBJECT", "OBSTRUCTED", "OBSTRUCTION", "OFF", "ON", "PRESSED", "RAISE", "RANGE",
     "REMAINING", "REMOTE", "REPAIR", "RESUME", "RETURN", "RIGHT", "ROTATE", "RANDOM", "SCAN", "SCANNED", "SCANNER", "SELF", "SHEILD",
     "SIGNAL", "SWITCH", "TANK", "TEAM", "THEN", "TO", "TRANSMIT", "TREADS", "TURN", "UNAVAILABLE", "UNLOCK", "UNLOCKED", "UP", "WAS",
     "WEAPON", "WITH", "WITHIN"
];

//   Enumerate
const wordSyms = {
     ACTIVE : 0, ALIGN : 1, ALIGNED : 2, ALLY : 3, ARE : 4, ARMOR : 5, AT : 6, AVAILABLE : 7, BACKWARD : 8, BEEP : 9, BEEP : 10,
     BEING : 11, BEYOND : 12, BRANCH : 13, BREAK : 14, CLEAR : 15, CLOSEST : 16, CODE : 17, COMMLINK : 18, COPY : 19, DATA : 20,
     DESTRUCT : 21, DETECT : 22, DIRECTION : 23, DISTANCE : 24, DO : 25, DOWN : 26, EMPTY : 27, ENEMY : 28, FACE : 29, FACING : 30,
     FIRE : 31, FOR : 32, FORWARD : 33, FOUND : 34, FROM : 35, FUEL : 36, FUNCTIONAL : 37, GET : 38, GOSUB : 39, GOTO : 40,
     HQ : 41, IF : 42, INACTIVE : 43, INCLUDE : 44, INTERNAL : 45, IS : 46, JAM : 47, KEY : 48, KIT : 49, LAST : 50,
     LAUNCH : 51, LEFT : 52, LOCK : 53, LOCKED : 54, LOWER : 55, MOVE : 56, MOVEMENT : 57, NOT : 58, OBJECT : 59, OBSTRUCTED : 60,
     OBSTRUCTION : 61, OFF : 62, ON : 63, PRESSED : 64, RAISE : 65, RANGE : 66, REMAINING : 67, REMOTE : 68, REPAIR : 69, RESUME : 70,
     RETURN : 71, RIGHT : 72, ROTATE : 73, RANDOM : 74, SCAN : 75, SCANNED : 76, SCANNER : 77, SELF : 78, SHEILD : 79, SIGNAL : 80,
     SWITCH : 81, TANK : 82, TEAM : 83, THEN : 84, TO : 85, TRANSMIT : 86, TREADS : 87, TURN : 88, UNAVAILABLE : 89, UNLOCK : 90,
     UNLOCKED : 91, UP : 92, WAS : 93, WEAPON : 94, WITH : 95, WITHIN : 96
};

const statmentSym = {
     VARDEC : 0, LABDEC : 1,
     IFSTATE : 2, MOVESTATE : 3,
     SCANSTATE : 4, TURNSTATE : 5,
     DETECTSTATE : 6, ROTATESTATE : 7,
     FIRESTATE : 8
}

const classifiers = [
     // LABEL DECLARATION
     /(^|\n)[A-Z].{0,}/,
     // VARIABLE DECLARATION
     /\t[A-Z].{0,} = (([A-Z].{0,} \+ \d)|([A-Z].{0,} - \d)|(\d))/,
     // IF STATEMENT
     /\t(IF) (([A-Z].{0,} ((<)|(<=)|(<>)|(>)|(>=)|(=)) ((\d)|([A-Z].{0,} \+ \d)|([A-Z].{0,} - \d)))|((TANK) (((TREADS) ((FUNCTIONAL)|(NONFUNCTIONAL)))|((MOVEMENT) ((OBSTRUCTED)|(CLEAR)))|((FUEL) ((REMAINING)|(EMPTY)))))|((CLOSEST) ((OBJECT) ((SEEN)|(UNSEEN))))|((ENEMY) (((SEEN)|(UNSEEN))|((WITHIN) (RANGE))))) (THEN) ((DO)|((BRANCH) (TO))) ([A-Z].{0,})/,
     // Move
     /\tMOVE ((NORTH)|(SOUTH)|(EAST)|(WEST)|(FORWARD)|(BACKWARD)|) \d/,
     // SCAN
     /\tSCAN (FOR) ((ENEMY)|(OBJECT))/,
     // Turn
     /\t((TURN) ((((RIGHT)|(LEFT)|((TO) (ANGLE))) (\d))|((TO) (SCANNER))))/,
     // DETECT
     /\tDETECT (OBSTRUCTION) (AT) ((FRONT)|(SCANNER)|((ANGLE) (\d)))/,
     // ROTATE
     /\tROTATE ((FRONT)|(((RIGHT)|(LEFT)|((TO) (ANGLE))) (\d)))/,
     // FIRE
     /\tFIRE (AT) ((ENEMY)|(OBSTRUCTION)|(OBJECT))/
]


const labelDec = (input) =>
{
     console.log("Label Found");
}

const varDec = (input) =>
{
     console.log("Var Found");
}

const ifState = (input) =>
{
     console.log("If Found");
}

const moveState = (input) =>
{
     console.log("Move Found");
}

const scanState = (input) =>
{
     console.log("Scan Found");
}

const turnState = (input) =>
{
     console.log("Turn Found");
}

const detectState = (input) =>
{
     console.log("Detect Found");
}

const rotateState = (input) =>
{
     console.log("Rotate Found");
}

const fireState = (input) =>
{
     console.log("Fire Found");
}

const parsers = [
     labelDec, varDec, ifState, moveState, scanState,
     turnState, detectState, rotateState, fireState
]

//   We will probably have to have some sort of update method and have the system variables update based on each update.
var string = "EDGE\n* Initialize user variables\n\n\tL.ENEMYFOUND? = 0\n\tL.DAMAGE? = 0\n\tL.INTDMG = INTDAMAGE\n\tL.MOVEDIR = 0\n\tL.POINT = 1\n\tL.X = L.X + 8\n\tIF TANK FUEL EMPTY THEN BRANCH TO LABEL\nES.TEST\n";

//   Get some input from text field and process it.
function Lexer(input){

     var i;
     var lines = input.split('\n');   //   This might not work properly.
     console.log(lines);

     for(var line of lines)
     {
          for(i = 0; i < classifiers.length; i++)
          {
               if (line.match(classifiers[i]) != undefined)
               {
                    parsers[i](line);
                    break;
               }
               //   If all classifiers have failed to parse then there is a Syntax Error!
               if (i == (classifiers.length - 1))
               {
                    alert("you effed up");
                    return -1;
               }
          }
     }
};

Lexer(string);
