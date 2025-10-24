import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },

        fullName: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        profilePicture: {
            type: String,
            default: ""
        }
    },{
        timestamps: true // what it does is, it automatically adds createdAt and updatedAt fields to the schema.. userful to show when user was created or updated.. user joined date
    }
)

const User = mongoose.model('User', userSchema);

export default User;