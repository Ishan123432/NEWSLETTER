//jshint esversion: 6
const express= require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;
const data = {
    members: [
        {
           email_address:email,
           status: "subscribed",
           merge_fields: {
            FNAME: firstName,
            LNAME: lastName
           }
        }
    ]
};
app.post("/failure",function(req,res){
    res.redirect("/");
})
const jsonData = JSON.stringify(data);

const url = "https://us21.api.mailchimp.com/3.0/lists/da87df2237";

const options = {
    method:"POST",
    auth: "ishan:78b81351b148ec271bcda2851e661f9b-us21"
}

const request = https.request(url,options,function(response){
    if(response.statusCode == 200)
    {
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html");
    }
    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
})
request.write(jsonData);
request.end();
});
app.listen(9000,function(){
    console.log("server is running on port 3000");
});

//2bdb7aab77385a631cca12b3a1ed4365-us21
//da87df2237
//8eeca44c9e78bca6471a2daa4c2b123e-us21