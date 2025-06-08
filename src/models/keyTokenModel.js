'use strict'

import mongoose, { Schema } from 'mongoose';
import { USER_COLLECTION_NAME } from './userModel';


export const KEY_TOKEN_DOCUMENT_NAME = 'Key'
export const KEY_TOKEN_COLLECTION_NAME = 'Keys'
// Declare the Schema of the Mongo model
var keyTokenSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: USER_COLLECTION_NAME
  },
  publicKey: {
    type: String,
    required: true,
  },
  privateKey: {
    type: String,
    required: true,
  },
  refreshTokensUsed: {
    type: Schema.Types.Array,
    default: []
  },
  refreshToken: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  collection: KEY_TOKEN_COLLECTION_NAME
});

//Export the model
export const keyTokenModel = mongoose.model(KEY_TOKEN_DOCUMENT_NAME, keyTokenSchema);