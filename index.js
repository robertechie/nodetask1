const http=require('http');
const fs=require('fs');
const path=require('path');
var qs = require('querystring');

const server= http.createServer(
(req, res)=>{
//make the alteration
if(req.method=='POST' && req.url=='/message'){
    var body='';
    req.on('data', (data)=>{
   body+=data;
   if (body.length > 1e6)
   request.connection.destroy();//to many items sent my hacker
 });
 req.on('end', ()=>{
     var post=qs.parse(body);
        //write the text into file message.text
        fs.writeFile(path.join(__dirname, "/myhtml", "message.txt"),  
        post.message,
              err => {
                if (err) throw err;
                res.end(`succesfully written to file`);
              });
          
 });
}else{
//end the operation
    let urlpath=path.join(__dirname,
        'myhtml',
        req.url==='/'? 'index.html':req.url
        );
  
    //let get the extension of the url
    let ext=path.extname(urlpath);
     let contentype='text/html';

     switch(ext){
        case '.html':
            contenttype='text/html';
            break;
        case '.js':
            contenttype='text/javascript';
            break;
        case '.css':
            contenttype='text/css';
            break;
        case '.json':
            contenttype='application/json';
            break;
        case '.png':
            contenttype='image/png';
            break;
        case '.jpg':
            contenttype='image/jpg';
            break;
      }

      // let us read the file
      fs.readFile(urlpath,(err, content)=>{
          if(err){
            ///re-chech for 404 error
                if(err.code=='ENOENT'){
                    res.end('404 error, page not fund') 
                }
          }else{

            res.writeHead(200, {'Content-Tpe':contentype});
            res.end(content, 'utf8');

          }


      });
    }
    }
);

//let us create out port
const port=process.env.port || 8000
//let listen to our port
server.listen(port,()=>console.log(`listening to port ${port}`));
