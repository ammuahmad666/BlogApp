require('dotenv').config();
const express = require('express');
const routes=require('./server/routes/main.js');
const app=express();
const cookies=require('cookie-parser')
const connectDB=require('./server/config/db.js');
const MongoStore=require('connect-mongo')
const session=require('express-session')
const methodOverride=require('method-override')
const expressLayout=require('express-ejs-layouts');
const PORT=5000||process.env.PORT;

//Middlewares
app.use(cookies());
app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  }));


//Connect to DB
connectDB();
//Templating engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

//Routing
app.use('/',require('./server/routes/main'));
app.use('/',require('./server/routes/admin'));

//Listening to server
app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`);
});

