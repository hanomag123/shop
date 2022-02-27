const http = require('http'),
    static = require('node-static'),
    file = new static.Server('.');
const port = '3000',
    host = 'localhost';
http.createServer(function(request, response) {
    request.addListener('end', () => {
        file.serve(request, response)
    }).resume();

}).listen(port, host, () => {
    console.log('Server is running at http://' + host + ':' + port);
})