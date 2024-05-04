import { MongoClient } from "mongodb";

class AuthService {
  db;
  constructor() {
    this.dbConnect()
  }
  dbConnect = async () => {
    const connect = await MongoClient.connect(process.env.MONGODB_URL)
    this.db = connect.db(process.env.DB_NAME)
  }
  storeUser = async (data) => {
    try {
      let response = await this.db.collection('users').insertOne(data)
      return response
    } catch (exception) {
      throw exception
    }
  }
}
const authSvc = new AuthService();
export default authSvc;