const express = require("express");
const app = express();
const apicache = require("apicache");
var cors = require("cors");
const port = 3000;

const { parse } = require("rss-to-json");

let cache = apicache.middleware;

//caching all routes for 24 hours
app.use(cache("24 hours"));

app.use(cors());

app.get("/api", (req, res) => {
  parse(req.query.rss).then((rss) => {
    const jsonFeed = JSON.stringify(rss, null, 3);
    res.send(jsonFeed);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
