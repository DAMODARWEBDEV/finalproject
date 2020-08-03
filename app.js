//jshint esversion:6


const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const multer = require("multer");
const path = require("path");
const mongoose = require('mongoose');
const md5 = require("md5");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const session= require("express-session");
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
//
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require("mongoose-findorcreate");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// app.use(express.static("./public/"));
// app.use(session({
//   secret:"our little secret.",
//   resave:false,
//   saveUninitialized:false
// }));
//
// app.use(passport.initialize());
// app.use(passport.session());

mongoose.connect("mongodb+srv://Damodar:Damodar30@cluster0-ayrxn.mongodb.net/RandomDB", {useNewUrlParser: true ,useUnifiedTopology: true});
//
// const passwords=["default"];
// const emails = ["default"];

// const randomSchema = new mongoose.Schema({stories : [{ type: Schema.ObjectId, ref: 'Story' }]
const randomSchema = new mongoose.Schema({
  Firstname:String,
  Lname: String,
 emails: String,
 passwords:String,
 genders:String,//
 bithdayall:String
// googleId:String

});

// randomSchema.plugin(passportLocalMongoose);
// randomSchema.plugin(findOrCreate);

const Detail = mongoose.model("Detail", randomSchema);


var storage = multer.diskStorage({


  destination: "./public/uploads/",
  filename:function(req,file,cb){

    cb(null, file.fieldname + "-" +Date.now() + path.extname(file.originalname));
  }

});


const upload = multer({

 storage :storage

}).single("myImage");



const pictureSchema = new mongoose.Schema({

imageprevname:String,
imagepathname: String,
imagename: String,
imagedescription:String,
imagesize:Number
});



const Picture =  mongoose.model("Picture", pictureSchema);

const PictureLaptop =  mongoose.model("PictureLaptop", pictureSchema);

const PictureSneaker =  mongoose.model("PictureSneaker", pictureSchema);

const PictureGame =  mongoose.model("PictureGame", pictureSchema);

// passport.use(Detail.createStrategy());
//
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
//
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });
//
//
// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://loacalhost:3000/auth/google/Random",
//     userProfileRRL:"http://www.googleapis.com/oauth2/v3/userinfo"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));


app.get("/", function(req, res) {
   res.render("front");

// const day = date.getDate();
//
//   res.render("list", {listTitle: day, newListItems: items});

});

app.get("/register", function(req, res){
  res.render("register");
});


app.get("/login", function(req, res){
  res.render("login");
});



////////////////////////////////////////////mobile start///////////////////////////
app.get("/mobile", function(req, res) {

Picture.find({}, function(err, foundItems){
    if(err)
    {

      console.log("eroro");
    }
     else {




// res.render("list");
 res.render("mobile", { newListItems: foundItems});

    }
  });

});

///////////////////////////end mobi\leww///////////////////////////////////////////////



///\\\\\\\\\\\\\\\\\\\\\\\\\start-laptop\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.get("/laptop", function(req, res) {

PictureLaptop.find({}, function(err, foundItems){
    if(err)
    {

      console.log("eroro");
    }
     else {




// res.render("list");
 res.render("laptop", { newListItems: foundItems});

    }
  });

});

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\end -laptop\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

///\\\\\\\\\\\\\\\\\\\\\\\\\start-sneakers\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.get("/sneakers", function(req, res) {

PictureSneaker.find({}, function(err, foundItems){
    if(err)
    {

      console.log("eroro");
    }
     else {




// res.render("list");
 res.render("sneakers", { newListItems: foundItems});

    }
  });

});

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\end -sneakers\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


///\\\\\\\\\\\\\\\\\\\\\\\\\start-game\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.get("/gaming", function(req, res) {

PictureGame.find({}, function(err, foundItems){
    if(err)
    {

      console.log("eroro");
    }
     else {




// res.render("list");
 res.render("gaming", { newListItems: foundItems});

    }
  });

});

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\end -game\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\




app.post("/details", function(req, res){
if(  req.body.pass === req.body.pswrepeat)
{
  // bcrypt.hash(req.body.pass, saltRounds, function(err, hash) {
   const password = md5(req.body.pass);
        const user = new Detail({
          Firstname: req.body.fname,
          Lname: req.body.lname,
          emails:req.body.email ,
          passwords: password,
          genders:req.body.gender,
          bithdayall:req.body.birthday


          });
          user.save(function(err){
              if (!err){

                // console.log(document.getElementById("logmeinside"));
                res.render("details");

              }
              else
              {

                res.render("eror");
              }

          });


  // });
}

else
{

    res.render("eror");

}
});



//
// app.get("/auth/google",function(req,res){
//
//   passport.authenticate("google",{scope:["profile"]})
// });
// app.get('/auth/google/Random',
//   passport.authenticate('google', { failureRedirect: '/eror' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/details');
//   });


app.post("/logmein", function(req, res){



    const loginemailsent = req.body.uname;
    const loginpasssent = md5(req.body.psw);


Detail.find(function(err,detail){
if(err)
{

  console.log(err);

}
else
{


let setnumvar = 0;

detail.forEach(function(details){

// console.log(details.passwords);
// bcrypt.compare(loginpasssent,  details.passwords , function(err, resssult) {
// console.log(details.passwords);



  if(details.passwords === loginpasssent  &&  details.emails === loginemailsent)
  {

   setnumvar = 1;
    // console.log(setnumvar);
    //
    // console.log("good");

  }
  else
  {
// console.log("bad");
  return false;

  }



// });








});

if(setnumvar)
{


   res.render("details");
}
else
{
 res.render("eror");
}

}

});




});








// const id="";

app.post("/upload", function(req, res){

  //upload(req,res,funtion(err){});
upload(req,res,(err) =>{

if(err)
{

console.log("eror");

}
else
{






const picprevname = req.file.originalname;
const picendname = req.file.filename;
const picname = req.body.imagetext;
const picparagraph = req.body.paragraphtext;
const picsize = req.file.size;
const  photo = new Picture({



   imageprevname:picprevname,
  imagepathname:picendname,
  imagename:picname,
  imagedescription: picparagraph,
  imagesize:picsize





});
photo.save(function(err){
    if (!err){

       res.render("details");

    }

});


}


});


});

///////////////////////////////////laptop started///////////

app.post("/uploadlaptop", function(req, res){

  //upload(req,res,funtion(err){});
upload(req,res,(err) =>{

if(err)
{

console.log("eror");

}
else
{








const picprevname = req.file.originalname;
const picendname = req.file.filename;
const picname = req.body.imagetext;
const picparagraph = req.body.paragraphtext;
const picsize = req.file.size;
const  photo = new PictureLaptop({



   imageprevname:picprevname,
  imagepathname:picendname,
  imagename:picname,
  imagedescription: picparagraph,
  imagesize:picsize





});
photo.save(function(err){
    if (!err){

       res.render("details");

    }

});


}


});


});

//////////////laptop end/////////////////////




/////////////////sneakers.////////////////



app.post("/uploadsneaker", function(req, res){

  //upload(req,res,funtion(err){});
upload(req,res,(err) =>{

if(err)
{

console.log("eror");

}
else
{








const picprevname = req.file.originalname;
const picendname = req.file.filename;
const picname = req.body.imagetext;
const picparagraph = req.body.paragraphtext;
const picsize = req.file.size;
const  photo = new PictureSneaker({



   imageprevname:picprevname,
  imagepathname:picendname,
  imagename:picname,
  imagedescription: picparagraph,
  imagesize:picsize





});
photo.save(function(err){
    if (!err){

       res.render("details");

    }

});


}


});


});
// sneker////////////////extended


/////////gaming/////////////////

app.post("/uploadgaming", function(req, res){

  //upload(req,res,funtion(err){});
upload(req,res,(err) =>{

if(err)
{

console.log("eror");

}
else
{








const picprevname = req.file.originalname;
const picendname = req.file.filename;
const picname = req.body.imagetext;
const picparagraph = req.body.paragraphtext;
const picsize = req.file.size;
const  photo = new PictureGame({



   imageprevname:picprevname,
  imagepathname:picendname,
  imagename:picname,
  imagedescription: picparagraph,
  imagesize:picsize





});
photo.save(function(err){
    if (!err){

       res.render("details");

    }

});


}


});


});
///gaming end////////////////////////




app.get("/about", function(req, res){
  res.render("about");
});

app.get("/terms", function(req, res){
  res.render("terms");
});


app.post("/delete", function(req, res){

  const q = req.body.itsid;
Picture.deleteOne({_id: q},function(err){
if(err)
{

  console.log("eror");
}
else
{

  // console.log("sucess");
    res.render("details");
}

});



});
///////////////////lapatop


app.post("/deletelaptop", function(req, res){

  const q = req.body.itsid;
PictureLaptop.deleteOne({_id: q},function(err){
if(err)
{

  console.log("eror");
}
else
{

  // console.log("sucess");
    res.render("details");
}

});



});



///////////////////

////////////sneakers


app.post("/deletesneakers", function(req, res){

  const q = req.body.itsid;
PictureSneaker.deleteOne({_id: q},function(err){
if(err)
{

  console.log("eror");
}
else
{

  // console.log("sucess");
    res.render("details");
}

});



});

////////////////


/////////////////uploadgaming/


app.post("/deletegaming", function(req, res){

  const q = req.body.itsid;
PictureGame.deleteOne({_id: q},function(err){
if(err)
{

  console.log("eror");
}
else
{

  // console.log("sucess");
    res.render("details");
}

});



});
////////////////

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}



app.listen(port, function() {
  console.log("Server has started  sucessfully");
});
