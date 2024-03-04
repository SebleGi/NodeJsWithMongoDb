const express= require('express'); //viewengin, middleware
const morgan=require('morgan'); // logger 
const mongoose =require('mongoose'); // to access mongo db as object mapper 
const Blog = require('./models/contact');
const Skill = require('./models/skill');
const app = express();
const con ='mongodb+srv://seble:test123@cluster0.alid8qg.mongodb.net/contacts?retryWrites=true&w=majority'
mongoose.connect(con,{useNewUrlParser:true, useUnifiedTopology:true}).then((result)=>console.log('connected to db')).catch((err)=>console.log(err));
app.set('view engine', 'ejs'); // register view engine
app.listen(3000);
// middleware and static files using express
app.use(express.static('public'));// all files in public folder will be accessable by  browser
app.use(express.urlencoded({extended:true})); // form data encoded
app.use(morgan('dev')); // logger
//therd party middleware ,logger morgan, autocator
// log every request
app.get('/add-contact',(req,res)=>{
   const contact = new Blog({
      subject:'first comment',
      email:'selina',
      comment:'happy to see you here'
   });
   contact.save()
   .then((result)=>{
      res.send(result)
   })
   .catch(()=>{
      console.log(err)
   });
});
app.get('/add-skills',(req,res)=>{
 
   const contact = new Skill({
      title:'C#, Java, JS, HTML, CSS, NodeJs, JQuary',
      lvl:'720px',
      clr:'95%'
   });
   
   contact.save()
   .then((result)=>{
      res.send(result)
   })
   .catch(()=>{
      console.log(err)
   });
});
app.get('/getAllContacts', (req,res)=>{
   Blog.find()
   .then((result)=>{
      res.send(result);
   })
   .catch((err)=>{
      console.log(err);
   });
});
app.get('/singlContact', (req,res)=>{
   Blog.find('64dcd3e20a1db134581a1111')
   .then((result)=>{
      res.send(result);
   })
   .catch((err)=>{
      console.log(err);
   });
});
app.use((req,res,next)=>{ // a middle ware to excute for each request
console.log('new request is made');
next(); // go to next middleware
});
app.use((req,res,next)=>{ // a middle ware to excute for each request
   console.log('all detail implimentation is here');
   next(); // go to next middleware
   });
app.get('/',(req,res)=>{

   res.render('index',{title:'Home'}); 
});
app.get('/index',(req,res)=>{
   // res.sendFile('./views/index.html',{root:__dirname});
   const intro = '';
   res.render('index',{title:'Home',intro}); // render view engine
});
app.get('/about',(req,res)=>{
   // res.sendFile('./views/about.html',{root:__dirname});
   res.render('about',{title:'about'}); 
});
app.get('/skills',(req,res)=>{
   ///////////To return Static Data//////////////////
   //const sks = [{title:'C#, Java, JS, HTML, CSS, NodeJs, JQuary',lvl:'720px',clr:'95%'},
  // {title:'SOAP, RestFul', lvl:'640px',clr:'80%'},
  // {title: 'Oracle, MongoDb, Ms sql, mySql' , lvl:'700px',clr:'90%'},
  // {title:'NodeJs, ReactJs, ExpressJs,NextJs', lvl:'640px',clr:'80%'},
  // {title:'Microstrategy, Tablaeu', lvl : '560px',clr:'70%'}]
   // res.render('skills',{title:'skills',sks:sks});
/////////// to fetch from DB//////////////////
Skill.find()
   .then((result)=>{
      res.render('skills',{title:'Top Skills',sks:result});
   })
   .catch((err)=>{
      console.log(err);
   });

});

app.get('/works',(req,res)=>{
    res.render('works',{title:'work'});
});
app.get('/contact',(req,res)=>{
   res.render('contact',{title:'contact'});
});
app.post('/contact',(req,res)=>{
  const blog = new Blog(req.body) // acessable by urlencoding
  blog.save()
  .then((result)=>{
      res.send(result);
  })
  .catch((err)=>{console.log(err)});
});
//if the url doesnot match the above one. should be at the bottom of the page
app.use((req,res) =>{
   // res.status(404).sendFile('views/404.html',{root:__dirname});
   res.status(404).sendFile('404')
});