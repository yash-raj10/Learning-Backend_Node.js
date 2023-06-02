import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; 

const app = express();

// using middlewares
app.use(express.static(path.join(path.resolve(), "public"))); //
app.use(express.urlencoded({ extended: true })); // to access the data from form
app.use(cookieParser());

// connect with mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
  })
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));

// mongo schema <for making a structure for data>
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// for making a collection
const User = mongoose.model("User", userSchema);

// setting up view engine
app.set("view engine", "ejs");


const  inAuthanticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (token){ 

   const decoded =  jwt.verify(token, "hdckushccdaj");

    req.user = await User.findById(decoded._id);

    next();
  } else {
    res.redirect("/login")
   }
};

app.get("/", inAuthanticated, (req, res) => {
  res.render("logout", {name: req.user.name});
});


app.get("/login",(req,res)=>{
  res.render("login");
})

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/login", async (req,res)=>{
  const {email, password} = req.body;

  let user = await User.findOne({ email });

  if (!user) return res.redirect("/register");
  //else user is there
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.render("login", { email, message:"Incorrect Password"});
//else isMAtch is happning
  const token = jwt.sign({_id: user._id},"hdckushccdaj");

  res.cookie("token", token,{
    httpOnly:true, 
    expires:new Date(Date.now()+60*1000),
  });
  res.redirect("/")
})


app.post("/register", async (req, res)=>{
  const { name, email,password } = req.body;

    let user = await User.findOne({email});
    if (user){
      return res.redirect("/login");
    }

  const hashedPass = await bcrypt.hash(password, 10);


  user = await User.create({
    name,
    email,
    password: hashedPass,
  });

  const token = jwt.sign({_id: user._id},"hdckushccdaj");

  res.cookie("token", token,{
    httpOnly:true, 
    expires:new Date(Date.now()+60*1000),
  });
  res.redirect("/")
});

app.get("/logout",(red, res)=>{
  res.cookie("token", null,{
    httpOnly:true, expires:new Date(Date.now()),
  });
  res.redirect("/")
 });


////////////////////////////////////////////////////////////////////////////////



app.listen(5000, () => {
  console.log("server is working");
});
