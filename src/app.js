const express = require('express');
const app = express();
const path = require("path");
require("./db/conn");
const Register = require("./models/register");
const hbs = require("hbs");
const { log } = require('console');
const port = process.env.PORT || 3000;
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");
/* const static_path = path.join(__dirname,"../public"); */
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine","hbs");
app.set('views',template_path);
hbs.registerPartials(partials_path);
app.get("/",(req,res)=>{
  res.render("index");
});
app.get("/register",(req,res)=>{
res.render("register");
});
app.post("/register", async (req,res)=>{
  try{
    const password = req.body.password;
    const cpassword  = req.body.password2;

    if(password  === cpassword){      
      const registerEmployee = new Register({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        confirmpassword:req.body.password2
      })
      console.log(registerEmployee);
      const registered = await registerEmployee.save();
      console.log(registered);
    }
    else{
      res.send('password mismatch');
    }
    res.status(200).render("login");
  }
  catch(error){
    res.status(400).send(error);
  }
})
app.get("/login",(req,res)=>{
  res.render("login");
  });
  app.post("/login",async (req,res)=>{
    try{
      console.log(req.body.email);
      console.log(req.body.password);
        const email = req.body.email;
        const password = req.body.password;
        const user =  await Register.find({email:req.body.email});
         if(user[0].password === password)
         res.status(200).render('index');
         else
         res.send("incorrect password");
      }
    catch(error){
      console.log(error);
      res.status(400).send(error);
    }
  });
app.listen(port,()=>{
    console.log(`server running @ ${port}`);
});