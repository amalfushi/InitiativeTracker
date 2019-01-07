const path = require("path"),
    Users = require("./../controllers/user"),
    Characters = require("./../controllers/character");

module.exports = function (app) {
    //User Routes
    app.post("/user", Users.create);
    app.get("/user/:id", Users.getOne);
    app.get("/users", Users.getAll);///TESTING

    //Character Routes
    app.post("/character", Characters.create);
    app.put("/character", Characters.update);
    app.get("/character/:id",  Characters.getOne);
    app.get("/characters",  Characters.getAll);
    app.delete("/character/:id",  Characters.deleteOne);

    //Session
    app.post("/session", Users.session);


    //this seems wrong
    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./angularApp/dist/index.html"));
    });
}