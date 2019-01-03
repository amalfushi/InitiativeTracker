const path = require("path"),
    Users = require("./../controllers/user");

module.exports = function (app) {
    //User Routes
    app.post("/users", Users.create);
    app.get("/users/:id", Users.getOne);

    //Character Routes
    app.post("/character", Users.addCharacter);
    //Session
    app.post("/session", Users.session);

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./angularApp/dist/index.html"));
    });
}