import { Schema, model, Document } from 'mongoose';

export class User {

  createdAt: Date;
  email: string;
  password: string;
};

let UserSchema: Schema = new Schema({

  createdAt: {
    required: false,
    type: Date,
    default: new Date()
  },

  email: {
    type: String,
    lowercase: true,
  },

  password: {
    type: String,
    require: true
  },
});

export interface IUserModel extends User, Document { };
UserSchema.index({ email: 1, type: 1, }, { unique: true }); // index schema level

export const UserModel = model<IUserModel>('User', UserSchema)


