import mongoose from 'mongoose';
import 'dotenv/config'

mongoose.connect(process.env.MONGODB_URL, {
  dbName:process.env.DB_NAME,
  autoIndex:true,
  autoCreate:true
}).then((db)=>{
  console.log(`Database connected successfully...`);
}).catch((error)=>{
  console.log(`Error connecting database`);
  throw error;
})