var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()


app.use(bodyParser.json())
app.use(express.static('/public'))
app.use(bodyParser.urlencoded({
    extended:true
}))


mongoose.connect('mongod://Localhost:27017/725db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', ()=> console.log("Error with connecting to database"));
db.once('open', ()=>console.log("Connected to the database"))

app.post("/signup",(req,res) =>{
    var name = req.body.name;
    var email = req.body.email;
    var number = req.body.number;
    var password = req.body.password;


    var data = {
        "name": name,
        "email": email,
        "number": number,
        "password": password
    }

    db.collection('users').insertOne(data,(err,collection) => {
        if(error){
            throw err;
        }
        console.log("User added succcessfully");
    });

    return res.redirect('/public/welcome.html')
})


app.get("/", (req, res) => {
    res.set({
        "allow-access-allow-origin": '*'
    })
    return res.redirect('registration.html');
})
.listen(3000);

console.log("Listening on port 3000");