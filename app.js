const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
const firstname=req.body.fname;
const lastname=req.body.lname;
const email=req.body.email;
const  data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstname,
                LNAME:lastname
            }
        }
    ]
};
const jsonData=JSON.stringify(data);
const url="https://us21.api.mailchimp.com/3.0/lists/3d017fa6d6";
const options={
    method:"POST",
    auth:"vishal:f0203b847b3b78611ea5fdfcdc3343e6-us21"
}
const request=https.request(url,options,function(response){
if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
}
else{
    res.sendFile(__dirname+"/failure.html");
}
response.on("data",function(data){
    console.log(JSON.parse(data));
})
})
request.write(jsonData);
request.end();
console.log(firstname,lastname,email);
})
app.post("/failure",function(req,res){
   res.redirect ("/");
})

app.listen(3000,function(){
    console.log("server is running");
})
// e6c231600eb2e18924ea41524023c262-us21
// 3d017fa6d6.
