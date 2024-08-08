let mongoose = require('mongoose')
let usergroupDetails = new mongoose.Schema({


    userName: {
        type: String,
        required: true
    },

   

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 15
    },
    roles: {
        type: [String], 
        enum: ['Admin', 'Manager', 'User'], 
        default: 'User' 
    },
    team:{
        type:String,
        default:"tech"
    }

    

}, { timestamps: true })
module.exports = mongoose.model("usergroupDetails", usergroupDetails)









