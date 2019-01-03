const mongoose = require("mongoose"),
    Users = mongoose.model("User");

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

    getOne: function(req, res) {
        Users.findById(req.params.id, (err, user) => {
            if (err) return res.json(err);
            return res.json(user);
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

    addCharacter: function (req, res) {
        
    }
}