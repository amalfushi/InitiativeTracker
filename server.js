const express = require("express"),
    app = express(),
    bp = require("body-parser"),
    path = require("path"),
    port = 80,
    session = require("express-session");

app.use(express.static(path.join(__dirname, "./angularApp/dist")));
app.use(bp.json());
app.use(session({
    secret: "super secret",
    resave: "false",
    saveUninitialized: true
}));

require("./server/config/mongoose");
require("./server/config/routes")(app);

app.listen(port, function(){
    console.log("Listening on port " + port);
});