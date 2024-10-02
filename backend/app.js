const express=require("express")
const mongoose=require("mongoose")
const User=require("../model/user.model")
const Home=require("../model/home.model")
const cors = require('cors');
const path = require('path'); 
const bcrypt=require("bcrypt")
mongoose.connect("mongodb+srv://mohamedmontser123zz:S745Xu6G2mXD5i0A@test.dk2vu.mongodb.net/?retryWrites=true&w=majority&appName=test").then(()=>
{
    console.log("connected to dat base")
}).catch((error)=>
{
    console.log("can not  connted to db"+error)
})
const app =express()
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())
app.use(express.urlencoded())
app.use(express.json())


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Assuming 'views' is in the same directory as app.js





// app.get("/", (req, res) => {
//     res.render("useruoloud"); 
// });


app.post("/signup",async (req,res)=>
{
    
const user =new User()
var input_userName=req.body.userNameF
var input_email=req.body.emailF
var input_password=req.body.PasswordF
var input_personType=req.body.personType
var statuesName=await uniqUserName(input_userName)
var statuesEmail=await uniqUserEmail(input_email)
console.log("statues for user name "+statuesName)
console.log("statues for email "+statuesEmail)
if(statuesName && statuesEmail)
{
user.personType=input_personType
user.userName=input_userName
user.email=input_email
user.password=await hashPassword(input_password)
const newuser=await user.save()
    res.json({massege:"تم انشاء الحساب بنجاح"})
}
else if(statuesName ==false && statuesName ==false)
{
    res.json({massege:"هذا الحساب موجود بالفعل"})
}
else if(statuesName ==false)
{
    res.json({massege:"اسم المستخدم موجود بالفعل"})
}
else if(statuesEmail ==false)
{
    res.json({massege:"هذا البريد الإلكتروني موجود بالفعل"})
}
else
{
    res.json({massege:"يرجى المحاولة مرة أخرى لاحقًا"})
}
});




app.post("/signin",async(req,res)=>
{
    console.log("signinpost ")
var input_email=req.body.emailF
var input_password=req.body.PasswordF
var user=await User.findOne({email:input_email})
console.log(user)
var result=await bcrypt.compare(input_password,user.password)
if (result)
{
    return res.status(202).json({ 
        message: "login successful", 
        username: user.userName, 
    });
}
else
{
    res.json({message:"login false"})

}
})

app.get("/create-homepost",(req,res)=>
{
    var username=req.query.username
    res.render("useruoloud", { username }); 

})





app.post("/create-homepost", async (req, res) => {
    const newHomePost = new Home();

    newHomePost.name = req.body.name; 
    newHomePost.description = req.body.description; 
    newHomePost.Nrooms = req.body.Nrooms; 
    newHomePost.Nbathrooms = req.body.Nbathrooms; 
    newHomePost.price = req.body.price; 
    newHomePost.place = req.body.place; 
    newHomePost.floor = req.body.floor; 
    newHomePost.area = req.body.area; 
    newHomePost.userName = req.body.username;
    console.log("usernameis   "+ req.body.username)
    await newHomePost.save();

    res.json({ message: "Home post created successfully!" });
});



app.listen(3000,()=>
{
    console.log("server started at port number 3000")
})


async function uniqUserName(inuserName)
{
    const nameU=await User.findOne({userName:inuserName})
   if(nameU ==null)
   {
    return  true;
   }
   else
   {
    return false;
   }

}


async function uniqUserEmail(inputemail)
{
    const emailU=await User.findOne({email:inputemail})
   if(emailU ==null)
   {
    return  true;
   }
   else
   {
    return false;
   }

}

async function hashPassword(password) {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}