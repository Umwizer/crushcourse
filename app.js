const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require('./models/blog.models.js');

//express app
const app = express();

//connect to mongoDB
const dbURI ='mongodb+srv://ruthumwizerwa32:LyP99JosZ8g79iD7@cluster0.xrryyvn.mongodb.net/'
mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('\x1b[31mError connecting to MongoDB:', err.message);
  });

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//register view engine
app.set("view engine", "ejs");
//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));

app.get("/", (req, res) => {
  res.redirect('/blogs');
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});

app.get("/about", (req, res) => {
  res.render("about", { title: 'about' });
});

//blogs routes
app.get('/blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.render('index', { title: 'All blogs', blogs: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
}); 

app.post('/blogs',(req,res) => {
console.log(req.body)
res.send('Data received')
})
// redirects
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'create new blog' });
});

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: '404 page' });
});
