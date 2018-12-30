const express = require("express"),
    app = express(),
    bp = require("body-parser"),
    path = require("path"),
    port = 8000;

app.use(express.static(path.join(__dirname, "./public/dist")));
app.use(bp.json());

// require("./server/config/mongoose");
require("./server/config/routes")(app);

app.listen(port, () => console.log(`\nListening on port ${port}.....\n`));
