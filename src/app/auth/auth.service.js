import UserModel from "./user.model.js";

class AuthService {

  storeUser = async (data) => {
    try {
let user = new UserModel(data);
return await user.save();

    } catch (exception) {
      throw exception
    }
  }
}
const authSvc = new AuthService();
export default authSvc;