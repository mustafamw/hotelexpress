
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export const UserManagementSchema = new Schema({
  id: ObjectId,
  email: String,
  givenName: {
    type: String,
    required: true
  },
  familyName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
    versionKey: false
  });