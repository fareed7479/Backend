let express = require('express')
let path = require('path')
const UserModel = require("./models/usermodel")

let app = express()
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')));

app.get("/",(req,res)=>{
    res.render("index")
})

app.post("/create",async (req,res)=>{
    let {name,email,image} = req.body;

    let CreatedUser = await UserModel.create(
        {
            name,
            email,
            image
        }
    )
    
    res.redirect("/read");
});


app.get("/read",async (req,res)=>{
    let allusers = await UserModel.find()
    res.render("read",{allusers});
})

app.get("/edit/:id",async (req,res)=>{
    let User = await UserModel.findOne({_id : req.params.id})
    res.render("edit",{User});
})

app.get("/update/:id",async (req,res)=>{
    let {name,email,image} = req.body;
    let updatedUser = await UserModel.findOneAndUpdate({_id : req.params.id},{name,email,image},{new:true})
    res.redirect("/read");
})



app.get("/delete/:id",async (req,res)=>{
    let deletedUSer = await UserModel.findOneAndDelete({_id : req.params.id});

    res.redirect("/read");
})



app.listen(4002)