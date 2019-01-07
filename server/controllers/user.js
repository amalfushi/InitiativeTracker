const mongoose = require("mongoose"),
    Users = mongoose.model("User"),
    Characters = mongoose.model("Character");

module.exports = {
    create: function (req, res) {
        Users.findOne({ username: req.body.username },
            (err, user) => {
                if (err) { //errored
                    return res.json(err)
                } else if (!user) { //create new user
                    Users.create(req.body, (err, newUser) => {
                        if (err) return res.json(err); //errored creating user
                        req.session.user_id = newUser._id;
                        return res.json(newUser);
                    });
                } else {
                    req.session.user_id = user._id;
                    return res.json(user);
                }
            }
        )
    },

    getOne: function (req, res) {
        Users.findById(req.params.id)
            .populate({ path: "saved_characters", model: "Character", options: { sort: { 'name': 1 }}})
            .exec((err, user) => {
                if (err) return res.json(err);
                return res.json(user);
            });
    },

    //////ONLY FOR TESTING
    getAll: function(req, res) {
        Users.find({}, (err, users) => {
            if (err) return res.json(err);
            return res.json(users);
        });
    },

    logout: function (req, res) {
        delete req.session.user_id;
        return res.json({ status: true });
    },

    session: function (req, res) { //return currently logged in user
        if (!req.session.user_id) { //fishy request
            return res.json({ status: false });
        }

        Users.findById(req.session.user_id, (err, user) => {
            if (err) return res.json(err);
            return res.json(user);
        });
    },

    //TODO:
    //  add password and validation
    //  add session checks
}