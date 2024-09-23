import express from "express"
import { dirname } from "path";  //import directory name from path
import { fileURLToPath } from "url"; // import file url path from url
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000

var id = 1;
var data = [{id: id, title: "hello", data: "how are you doing", time: new Date()}];

app.use(express.static(__dirname + '/public'));
//console.log("serving from directory:" ,__dirname)
app.use(bodyParser.urlencoded({extended: true}))



//all get methods
app.get("/",(req, res)=>{
    console.log("the number of data point is: "+ data.length)
    res.render("index.ejs", {data:data})
})

app.get("/create", (req,res) =>{
    res.render("create.ejs")
});

app.get("/edit", (req,res)=>{
    res.render("edit.ejs",{data:data})
});

app.get("/delete", (req,res)=> {
    res.render("delete.ejs", {data: data})
});


//all post methods
app.post("/create-post",(req, res) => {
    console.log( req.body.title, req.body.content)
    data.push({id: id++, title:req.body.title,data: req.body.content, time: new Date()})
    res.redirect("/")
})

app.post("/edit-post",(req,res)=>{
    for(var i = 0; i < data.length; i++){
        if(data[i].id == req.body.id){
            console.log("data to be deleted: ", data[i])
            data[i] = {
                id: req.body.id, title: req.body.title, data: req.body.content, time: new Date()}
        }else{
            console.log("data not found")
        }
    }
    res.redirect("/")
})

app.post("/delete" , (req, res)=>{
    
    for(var i = 0; i < data.length; i++){
        if(data[i].id == req.body.id){
            console.log("data to be deleted: ", data[i])
            data.splice(i, 1)
        }else{
            console.log("data not found")
        }
    }
    res.redirect("/delete")
})

//listening
app.listen(port, () => {
    console.log(`listening on port ${port}.`)
})