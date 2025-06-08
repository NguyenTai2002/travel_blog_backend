import mongoose from 'mongoose';


export const USER_DOCUMENT_NAME = 'User'
export const USER_COLLECTION_NAME = 'Users'

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    password:{
        type:String,
        required:true,
    },
    verify: {
      type: Boolean,
      default: false
    },
    avatarUrl: {
      type: String
    },
    bio: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date
    }

}, {
  timestamps: true,
  collection: USER_COLLECTION_NAME
});


export const userModel = mongoose.model(USER_DOCUMENT_NAME, userSchema)
