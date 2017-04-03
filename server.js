var http = require('http');
var HttpDispatcher = require('httpdispatcher');
var fs = require('fs');

const PORT=8080; 
var dispatcher = new HttpDispatcher();

//For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic('node_modules');
//A sample GET request    
dispatcher.onGet("/", function(req, res) {
	fs.readFile('./index.html', function(error, content) {
      res.end(content);
  	});
}); 

//We need a function which handles requests and send response
function handleRequest(request, response){
    try {
    	//log the request on console
        console.log(request.url);
        //Disptach
    	dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});