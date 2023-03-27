const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();

let items = ["Weekend To Do List"];



let weekendItems = ["ICS 360 Mindtap", 
                    "Prepare Data for Exploration",
                    "Process Data from Dirty to Clean",
                    "Analyze Data to Answer Questions",
                    "ICS 385 Homework",
                    "Build Wireframes and Low-Fidelity Prototypes", 
                    "Conduct UX Research and Test Early Concepts"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));


app.get("/", function(req, res) {

    let day = date.getDate();
    res.render("list", {listTitle: day, newListItems: items});
    
});


app.post("/", function(req, res) {
    

    let item = req.body.newItem;
    
     if (req.body.list === "Weekend") {
        weekendItems.push(item);
        res.redirect("/weekend");
    }

    else {
        items.push(item);
        res.redirect("/");
    }
});




app.get("/weekend", function(req, res){
  let day = date.getDate();
    res.render("list", {listTitle: "Weekend To Do List", newListItems: weekendItems})
});

app.listen(3000, function() {
console.log ("Server is running on port 3000")
});