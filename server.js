const bcrypt = require("bcrypt");
const path = require('path');
const bodyparser = require('body-parser');
const express = require('express');
const Session = require('express-session');
const cookieParser = require('cookie-parser');
const csprng = require('csprng');
const {
	Client
} = require('pg');

const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

var request = require('request').defaults({
		encoding: null
	});

const saltRounds = 10;

// Returns true if a prohibited character is detected, returns false otherwise
function checkInput(inputobj) {
	let prohibitedChars = ['\"', '\'', ';']
	for (let key in inputobj) {
		for (let char in prohibitedChars) {
			if ((inputobj[key]).indexOf(prohibitedChars[char]) > -1) {
				console.log("invalid char of: " + inputobj[key] + " char: " + prohibitedChars[char]);
				return true;
			}
		}
	}
	return false;
}

const app = express(); // main app object

const port = process.env.PORT || 8080; // uses server env port if exists, else uses default 8080
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
		extended: true
	}))
app.use(cookieParser());
app.use(Session({
		secret: csprng(256, 36)
	}));
app.enable('trust proxy');

// Add a handler to inspect the req.secure flag (see
// http://expressjs.com/api#req.secure). This allows us
// to know whether the request was via http or https.
app.use(function (req, res, next) {
	if (req.secure) {
		// request was via https, so do no special handling
		next();
	} else {
		// request was via http, so redirect to https
		res.redirect('https://' + req.headers.host + req.url);
	}
});
app.use(function (req, res, next) {
	console.log(req.session.userid);
	if (checkInput(req.body)) {
		res.status(400).send();
	} else {
		next();
	}
});

/* defining static content directories
Eg: accessing "domain.com/views" will actually access "server_directory/public/html/"
frontend dir name             backend dir name
|			                  |               */
app.use('/', express.static('public/'));
app.use('/media', express.static('public/media/'));
app.use('/html', express.static('public/html/'));
app.use('/css', express.static('public/css/'));
app.use('/js', express.static('public/js/'));

// routes
client.connect(); // connect to db
// for homepage get requests
app.get('/', function (req, res) {
	if (req.session.loggedin != true) {
		console.log("Serving login.html");
		res.sendFile(__dirname + '/public/html/StartScreen.html');
	} else {
		res.redirect("/dashboard");
	}
});

app.get('/sim', function (req, res) {
        res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/login', function (req, res) {
	if (req.session.loggedin != true) {
		console.log("Serving login.html");
		res.sendFile(__dirname + '/public/html/StartScreen.html');
	} else {
		res.redirect("/dashboard");
	}
});

app.post('/login', function (req, response) {
	console.log("receiving login info:");
	if (req.body.username > 50 ||
		checkInput(req.body)) {
		response.status(400).send();
	} else {
		 let query = 'SELECT * FROM users WHERE username=\'' + req.body.username +'\';';
		 client.query(query, (err, res) => {
	 	if (!err){
		 	if (res.rowCount == 1) {
		 		bcrypt.compare(req.body.password, res.rows[0].passwordhash, (err2, same) => {
		 			if (!err2){
		 			console.log("password compare: " + same);
		 			if (same) {
		 				req.session.loggedin = true;
		 				req.session.userid = res.rows[0].id;
		 				console.log("redirecting to dash");
		 				response.set('Access-Control-Allow-Origin','*');
		 				response.status(200).send();
		 			} else {
					response.status(401).send();
		 			}
		 			} else {
		 				console.log(err2);
		 			}

				});
		 	} else {
		 		response.status(401).send();
		 	}
		 	} else {
		 		console.log(err);
		 	}
		 });
	}
});

app.get('/logout', function (req, res) {
	req.session.loggedin = false;
	req.session.id = undefined;
	res.redirect("/login");
})

app.post('/signup', function (req, res) {
	console.log("recieving signup info:");
	if (checkInput(req.body)) {
		res.status(400).send();
	} else {
		let userdata = req.body;
		let hash = bcrypt.hashSync(userdata.password, saltRounds);
		let query = "INSERT INTO users (username, passwordhash, firstname, lastname, email) VALUES (\'" + userdata.username + "\', \'" + hash + "\', \'" + userdata.firstname + "\', \'" + userdata.lastname + "\', \'" + userdata.email + "\');";

		client.query(query, (err, res2) => {
			if (err) {
				console.log(err.stack);
		 	}
		});
		res.status(200).send();
	}
});





// app.post('/add', function (req, res) {
// 	console.log("recieving add info:");
// 	if (req.session.loggedin) {
// 		let query = "INSERT INTO contacts (id, fname, lname, phonenumber, email, address, city, state, zipcode) VALUES (\'" + req.session.userid+ "\', \'" + req.body.firstName + "\', \'" + req.body.lastName + "\', \'" + req.body.phone + "\', \'" + req.body.email + "\', \'" + req.body.street + "\', \'" + req.body.city + "\', \'" + req.body.state + "\', \'" + req.body.zip + "\');";
// 		console.log(query);
// 			client.query(query, (err, res2) => {
// 				if (err) {
// 					console.log(err.stack);
// 				} else {
// 					console.log(res2);
// 				}
// 			});
// 		res.status(200).send();
// 	} else {
// 		res.redirect("/login");
// 	}
// });

// app.post('/delete', function (req, res) {
// 	console.log("recieving add info:");
// 	if (req.session.loggedin) {
// 		//let query = "DELETE FROM contacts WHERE id = \'" + req.session.userid + "\' AND fname = \'" + req.body.firstName + "\' "+
// 		//"AND lname = \'" + req.body.lastName + "\' AND phonenumber = \'" + req.body.phone + "\' AND email = \'" + req.body.email + "\'"+
// 		//" AND address = \'" + req.body.street + "\' AND city = \'" + req.body.city + "\' AND state = \'" + req.body.state + "\' AND zipcode = \'" + req.body.zip + "\';";
// 		let query = "DELETE FROM contacts WHERE id=\'" + req.session.userid + "\' AND contactId=" + req.body.id + ";";
// 		console.log(query);
// 		client.query(query, (err, res2) => {
// 			if (err) {
// 				console.log(err.stack);
// 			}
// 		});
// 		res.status(200).send();
// 	} else {
// 		res.redirect("/login");
// 	}
// });

// app.post("/contacts", function (req, res) {
// 	console.log("recieving contacts info:")
// 	if (req.session.loggedin) {
// 		let query = 'SELECT * FROM contacts WHERE id =\'' + req.session.userid + '\';';
// 		client.query(query, (err, res2) => {
// 			if (err) {
// 				console.log(err.stack);
// 			} else {
// 				if (res2.rowCount != 0) res.status(200).send(res2.rows);
// 				else res.status(404).send();
// 			}
// 		});
// 	} else {
// 		res.redirect("/login");
// 	}
// });

app.post('/save', function (req, res) {
	console.log("recieving add info:");
	console.log(req.session.loggedin);
	if (req.session.loggedin) {
			let query = "INSERT INTO codestore (userid, code, filename) VALUES (\'" + req.session.userid + "\', \'" + req.body.fileCode + "\', \'" + req.body.fileName + "\') ON CONFLICT (filename) WHERE (userid = \'"+req.session.userid+"\') DO UPDATE SET code = EXCLUDED.code;";
			console.log(query);
			client.query(query, (err, res2) => {
				if (err) {
					console.log("lol " + err.stack);
				} else {
					console.log(res2);
					res.status(200).send();
				}
			});
	} else {
		response.status(401).send();
	}
});

app.post('/open', function (req, res) {
	if (req.session.loggedin) {
		client.query('SELECT code from codestore WHERE userid = ' + req.session.userid + ' AND filename = \'' + req.body.fileName + '\';', (err, res2) => {
			if (err) {
				console.log("lol " + err.stack);
			} else if (res2.rows.length > 0) {
				console.log(res2.rows);
					res.send(res2.rows[0].code);

			}
		});
	} else {
		response.status(401).send();
	}
});

app.get('/files', function (req, res) {
	if (req.session.loggedin) {
		client.query('SELECT filename from codestore WHERE userid = \'' + req.session.userid + '\';', (err, res2) => {
			if (err) {
				console.log(err);
			} else {
				res.send(res2.rows.map(function(item){ return item.filename; }));
			}
		});
	} else {
		res.redirect("/");
	}
});

app.get('/maps', function (req, res) {
	if (req.session.loggedin) {
		client.query('SELECT map_name from maps WHERE userid = \'' + req.session.userid + '\';', (err, res2) => {
			if (err) {
				console.log(err);
			} else {
				res.send(res2.rows.map(function(item){ return item.filename; }));
			}
		});
	} else {
		response.status(401).send();
	}
});

app.post('/getmap', function(req, res){
	if (req.session.loggedin){
	client.query("SELECT image_representation,map_object FROM maps WHERE user_id=\'"+req.session.userid+"\' AND map_name=\'" + req.body.mapName + "\';", (err, res2) => {
		if (err) {
				console.log(err.stack);
			} else {
				res.send(res2.rows[0]);
			}
	});
	} else {
		response.status(401).send();
	}
});

app.post('/postmap', function(req, res) {
	if (req.session.loggedin){
	let query = "INSERT INTO maps (user_id, image_representation, map_object, map_name) VALUES (\'" +req.session.userid+ "\',\'"+req.body.image+"\',\'"+req.body.map+"\',\'"+req.body.name+"\')  ON CONFLICT (map_name) WHERE (userid = \'"+req.session.userid+"\') DO UPDATE SET (map_object = EXCLUDED.map_object, image_representation = EXCLUDED.image_representation);";
	client.query(query, (err, res2) => {
				if (err) {
					console.log("lol " + err.stack);
				} else {
					console.log(res2);
					res.status(200).send();
				}
			});
	} else {
		response.status(401).send();
	}
});

// // dumps user table if logged in
app.get('/db', function (req, res) {
	console.log("showing DB results");
	//if (req.session.loggedin == true) {
	client.query('SELECT * FROM users', (err, res2) => { // dump db into variable
		var dbresult = "";
		if (err)
			throw err;
		console.log(res2);
		for (let row of res2.rows) {
			dbresult += JSON.stringify(row) + "\n";
		}
		console.log(dbresult);
		res.send(dbresult);
	});
	//} else {
	res.redirect("/");
	//}
});

app.get('/dashboard', function (req, res) {
	if (req.session.loggedin) {
		console.log(req.session.loggedin);
		console.log("Serving dashboard.html");
		return res.status(200).sendFile(__dirname + '/public/html/dashboard.html');
	} else {
		res.redirect("/");
	}
});

app.get('/edit', function (req, res) {
	if (req.session.loggedin) {
		console.log(req.session.loggedin);
		console.log("Serving textEdit.html");
		return res.status(200).sendFile(__dirname + '/public/html/textEdit.html');
	} else {
		res.redirect("/");
	}
});

app.get('/SimSetup', function (req, res) {
	if (req.session.loggedin) {
		console.log(req.session.loggedin);
		console.log("Serving simSetupEZ.html");
		return res.status(200).sendFile(__dirname + '/public/html/simSetupEZ.html');
	} else {
		res.redirect("/");
	}
});

// start app on port
app.listen(port, () => console.log("active on port: " + port));


/*app.get('/allfiles', function (req, res) {
	if (req.session.loggedin) {
		client.query('SELECT filename from codestore;', (err, res2) => {
			if (err) {
				console.log(err);
			} else {
				res.send(res2.rows.map(function(item){ return item.filename; }));
			}
		});
	} else {
		res.redirect("/");
	}
});*/
