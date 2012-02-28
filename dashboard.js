var http = require('http');
var fs   = require('fs');

var express = require('express')
var app = express.createServer();

app.get('/raw', function(req, res) {
    fs.readFile('./bz.txt', function(err, data) {
	res.attachment("data.csv");
	res.end(data, 'UTF-8');
    });
});

app.get('/show', function(req, res) {
    var site = http.createClient(3000, "localhost"); 
    var request = site.request("GET", "/raw", {'host' : "localhost"})
    request.end();
    request.on('response', function(response) {
	var data = "";
	response.setEncoding('utf8');
 
	response.on('data', function(chunk) {
	    data += chunk;
	});
 
	response.on('end', function() {
	    var blockerValues = [];
	    var lines = data.split("\n");
	    lines.forEach(function(line, index) {
		var columns = line.split(",");
		if (columns.length == 3)
		    blockerValues.push({ time :  columns[0], beta_count : columns[1], final_count : columns[2]});
	    });
	    res.contentType('application/json');
	    res.send(JSON.stringify(blockerValues));
	});
    });
});


app.get('/', function(req, res){
    res.render('index.jade'); 
});


app.use("/RGraph", express.static(__dirname + '/lib'));
app.use("/lib", express.static(__dirname + '/lib'));



app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true }));
    app.set('view options', {
	pretty: true,
	layout: false
    });
});

app.listen(3000);
console.log('Express server started on port %s', app.address().port);
