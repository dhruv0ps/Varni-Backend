const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: "Active",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   isAdmin:{type : Boolean }
 
 
});

module.exports = mongoose.model('User', UserSchema);