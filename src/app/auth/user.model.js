import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'seller', 'customer'],
    default: "customer"
  },
  address: {
    type: String,
    required: true
  },
  phone: String,
  password: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'other'],
    default: "inactive"
  },
  image: {
    type: String,
    required: true
  },
  token: String,
  forgetToken: String,
  validateTill: Date
}, {
  timestamps: true,
  autoIndex: true,
  autoCreate: true,
  // collection: "authusers"
})
//users ==>authusers
const UserModel = mongoose.model("User", 'userSchema')
export default UserModel;
