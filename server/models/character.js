const mongoose = require("mongoose");

const CharacterSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Character Names must be at least 2 characters"],
        minlength: [2, "Character Names must be at least 2"]
    }

}, { timestamps: true });

mongoose.model("Character", CharacterSchema);