//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const app = express();
const mongoose=require('mongoose');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
mongoose.connect('mongodb+srv://absolute_naman:KIET123@cluster-1.bv4rl.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true});
const db=mongoose.connection;
const blogSchema ={
    post_title:  String,
    post_text:String
};
const post_reference_table=mongoose.model("Post",blogSchema);
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";




app.get("/",async function(req,res)
{
  let post=new Array();
  try {
    const result=await post_reference_table.find({});
    result.forEach(item=>
      {
        post.push(item);
      }
      )
      res.render('home', {
        blog_data: homeStartingContent,//constant data
        post_var:post//variable data
      });
  } catch (error) {
    res.send("Data fetch error",error);
  }
   
});
app.get("/about",function(req,res)
{
    res.render('about', {blog_data: aboutContent});
});
app.get("/contact",function(req,res)
{
    res.render('contact', {blog_data: contactContent});
});
app.get("/compose",function(req,res)
{
    res.render('compose');
});

app.post("/compose",function(req,res)
{

  var x=
    {
      title:req.body.composed_title,
      message:req.body.composed_message
    }
  ;
  let new_item=new post_reference_table(
    {
      post_title:x.title,
      post_text:x.message
    }
  );
  new_item.save();
  // post.push(x);
  // console.log(post);
  res.redirect( '/');
});

app.get("/posts/:postId",async function(req,res)
{
  let x=req.params.postId;
  console.log(x);
  try {
    let model_name=await post_reference_table.find({_id:x}); 
    // console.log(model_name);
    res.render('post', {post:model_name});

  } catch (error) {
    res.send("Post fetch Error",error);
  }
//   for(let i=0;i<post.length;i++)
//   {
//     if(_.lowerCase(post[i].title)==x)
//     res.render('post', {post: post[i]});
// }
 
});

const port= process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Server started on port 3000");
});
