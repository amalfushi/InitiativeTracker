const mongoose = require("mongoose"),
    Users = mongoose.model("User"),
    Characters = mongoose.model("Character");

module.exports = {
    create: function (req, res) {
        Characters.create(req.body, (err, character) => {
            if (err) return res.json(err);

            Users.findByIdAndUpdate(character.user_id,
                { $push: { saved_characters: character } },
                (err) => {
                    if (err) return res.json(err);
                }
            );

            return res.json(character);
        });
    },

    getOne: function (req, res) {
        Characters.findById(req.params.id, (err, character) => {
            if (err) return res.json(err);
            return res.json(character)
        });
    },

    getAll: function (req, res) {
        Characters.find({}, (err, characters)=> {
            if (err) return res.json(err);
            return res.json(characters);
        })
    },

    update: function (req, res) {
        Characters.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, character) => {
            if (err) return res.json(err);
            // returns newly updated character, not original
            return res.json(character);
        });
    },

    deleteOne: function (req, res) {
        console.log(`got to controller: ${req.params.id}`)
        Characters.findOneAndDelete(req.params.id, (err) => {
            if (err) return res.json(err);

            Users.findOneAndUpdate(req.session.user_id, { $pullAll: { saved_characters: [req.session.id] } }, (err, user) => {
                if (err) return res.json(err);
                console.log("success")
            });
            return res.json();
        });
    }

    //TODO:
    //  user session validation
}