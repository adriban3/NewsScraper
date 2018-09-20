var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

var PORT = process.env.PORT || 3000;

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));//not really sure what this is tbh

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/scrape", function (req, res) {
    axios.get("http://www.espn.com/").then(function (response) {
        var $ = cheerio.load(response.data);

        $("a", "article").each(function (i, element) {
            var result = {};

            result.title = $(this).children("contentItem__contentWrapper").children("contentItem__titleWrapper").children("h1").text();
            result.summary = $(this).children("contentItem__contentWrapper").children("contentItem__titleWrapper").children("p").text();
            result.link = $(this).attr("href");

            db.article.create(result)
                .then(function (dbArticle) {
                })
                .catch(function (err) {
                    return res.json(err);
                });
        });

        console.log("Scrape Complete");
    });
});

app.get("/articles", function (req, res) {
    db.article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        })
});

app.get("/saved", function (req, res) {
    db.article.find({ saved: true })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        })
});

app.post("/saved", function (req, res) {

})

app.post("/comment", function (req, res) {

})
//need an get route to find all saved articles
//need a post route to save articles
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});