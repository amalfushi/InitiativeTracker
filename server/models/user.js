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
        type: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Character"
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