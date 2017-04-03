
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));
app.use(express.static('.'));
app.listen(app.get('port'), function(){
	console.log('Ready on port: ' + app.get('port'));
});
