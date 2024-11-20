const path = require("path");
const multer  = require('multer')
const express = require("express")
const app = express();
const port = 8000
// const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({destination:function(req,file, cb){
cb(null, './uploads')

},filename:function(req, file, cb){
    const uniqueSuffix = Date.now()
    cb(null, file.fieldname + '-' + uniqueSuffix)

}})
const upload = multer({ storage: storage })

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.urlencoded({extended:false})); // form data ko parse karne me help karta hai 
app.post("/upload",upload.single("profileimage"),(req,res)=>{
console.log(req.body);
console.log(req.file);
return res.redirect("/");

})
app.get("/",(req,res)=>{
    return res.render("homepage");
})
app.listen(port, ()=>console.log(`server connected at ${port}`))