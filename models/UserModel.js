const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

        googleId: {
            type:"String",
            required: true,

        },

        avatar: {
            type: "String",
            default: " "

        },
        name: {
            type: "String",
            required: true,
        },

        Date:{
            type: "String",
            
        }

    }

);

const User = mongoose.model('User', UserSchema);

module.exports= User;
