var fs = require('fs');
var xml2js = require('xml2js');
var builder = new xml2js.Builder();
var express = require('express');
var app = express();

var displayAllForms = function (formsArray){
	var forms = [];
	for (var i = 0; i < formsArray.length; i++) {
		forms.push({name : formsArray[i].$.id, index: i});
	};
	return forms;
}

var formsArray; 

(function() {
	var parser = new xml2js.Parser();
	fs.readFile('config_subset.xml', function(err,data) {
		parser.parseString(data,function(err,result) {
			formsArray = result.ApplicationConfiguration.Forms[0].Form;
		});
	});
})();

app.use(express.static('public'));
 
app.get('/',function(req,res) {
	res.sendFile(__dirname + '/index.html');
});

// JSON
app.get('/forms',function(req,res) {
	res.send(displayAllForms(formsArray));
});

app.get('/forms/:id',function(req,res) {
	res.send(formsArray[req.params.id].field);
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
