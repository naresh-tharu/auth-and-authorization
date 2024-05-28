import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    min:2,
    max:50
  },
  email:{
    type:String,
    required:true,
    unique:true,
  }, 
  role:{
    type:String,
    required:true,
    enum:['admin', 'seller', 'customer'],
    default:"customer"
  },
  address:{
    type:String,
    required:true
  },
  phone:String,
  password:String,
  status:{
    type:String,
    enum:['active', 'inactive'],
    default:'inactive'
  },
  image:{
    type:String,
    required:true,
  },
  token:String,
  forgetToken:String,
  validateTill:Date

},{
  timestamps:true,
  autoIndex:true,
  autoCreate:true,
  
})

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;