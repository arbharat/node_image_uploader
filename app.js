var express=require('express');
var multer=require('multer');
var app=express();
app.use(multer({ dest: './uploads/'}));
var http=require('http');
var server=http.createServer(app);
var fs=require('fs');
var cloudinary=require('cloudinary');


cloudinary.config({
 cloud_name: 'your_cloud_name',
 api_key: 'your_api_key',
 api_secret: 'your_api_secret'
})


app.get('/', function(req,res){
 res.sendfile('index.html');
});

app.post('/new', function(req,res){
  var imageFile=req.files.photo;
  console.log(imageFile.path);      
  cloudinary.uploader.upload(
  imageFile.path,
  function(result) { 
     //This function is called when upload to Cloudinary is done
     //The below is the url to your image that is now on the cloudinary database
     console.log(result.secure_url);
     res.write('<p><b>The image was uploaded successfully!</b></p>');
     res.write('<p>Path to image on local disk:<br><br>' + imageFile.path+'</p>');
     res.end('<p>URL: <br><br>'+result.secure_url+'</p>');
  },
  {
    public_id: 'sample', 
    crop: 'limit',
    width: 2000,
    height: 2000,                                    
    tags: ['special', 'for_homepage']
  }      
);
  return;
});

var port=process.env.PORT || 5000;
server.listen(port);
console.log("Listening on "+port);
