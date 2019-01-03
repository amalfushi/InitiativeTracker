const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minLength: [2, "Usernames must be 2 or more characters"],
        maxLength: [50, "Usernames must be less than 50 characters"]
    },
    character_settings: [{
        type: String,
        minLength: [1, "Character settings must be 1 or more character"],
        maxLength: [50, "Character settings must be less than 50 characters"]
    }],
    saved_characters: {
        required: true,
        type: [{ //array of characters....maybe should be seperate;
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
            }
        }],
        default: []
    },
    isDemo: {
        required: true,
        type: Boolean,
        default: false
    }
}, { timestamps: true });

mongoose.model("User", UserSchema)