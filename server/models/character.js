const mongoose = require("mongoose");

const CharacterSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [1, "Character Names must be 1 or more character"],
        maxLength: [50, "Character Names must be less than 50 characters"],
        requred: true
    },
    player_name: {
        Type: String,
    },
    initiative: {
        type: Number,
        default: 0,
        required: true
    },
    rolls: {
        type: [
            //DICE ROLLS
            {
                name: {
                    type: String,
                    required: true,
                    minLength: [2, "Roll Names must be 2 characters"],
                    maxLength: [50, "Roll Names must be less than 50 characters"]
                },
                dice_string: {
                    type: String,
                    required: true,
                    minLength: [2, "Roll Strings must be 2 characters"],
                    maxLength: [50, "Roll Strings must be less than 50 characters"]
                }
            }],
        default: []
    },
    stats: {
        type: Object,
        required: true,
        default: {}
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, { timestamps: true });

mongoose.model("Character", CharacterSchema);