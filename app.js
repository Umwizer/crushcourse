const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require('./models/blog.models.js')
//express app
const app = express();

//connect to mongoDB
const dbURI ='mongodb+srv://ruthumwizerwa:fI2OJ3zp7dWmt2O9@cluster0.ykpdugp.mongodb.net/';
mongoose.connect(dbURI)
.then(() => {
  console.log('Connected to MongoDB');
  // Start the Express server after successful connection
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
})
.catch(err => {
  console.error('\x1b[31mError connecting to MongoDB:', err.message);
});
//register  view engine
app.set("view engine", "ejs");

//listen for requests
// app.listen(3000);

app.use(morgan('tiny')); 
// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
const blog = new Blog({
  title:'new blog',
  snippet:'Learn using net ninja',
  body:'more about new blog'
});
blog.save().then((result)=>{
  res.send(result);
})
.catch((err) => {
console.log(err);
})
})
//middleware and static files
app.use(express.static('public'))
app.get("/", (req, res) => {
  //res.send('<p>home page</p>');
  const blogs =[
{title:'Ruth Neeeds to learn react',snippet:'Learn using net ninja'},
{title:'Ruth Neeeds to learn new development',snippet:'Learn using net ninja'},
{title:'Ruth Neeeds to learnnews',snippet:'Learn about new news'}
  ]
  res.render("index",{title:'home page',blogs:blogs});
});
app.use((req,res,next) => {
  console.log('in the next middleware')
  next()
  })

  app.get("/about", (req, res) => {
    res.render("about",{title:'about'});
  });
  // redirects
  app.get('/blogs/create', (req, res) => {
    res.render('create',{title:'create new blog'});
    })
//404 page

//404 page
app.use((req, res) => {
  res.status(404).render("404",{title:'404 page'});});;
