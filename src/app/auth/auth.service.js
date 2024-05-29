import UserModel from "./user.model.js";

class AuthService {
  storeUser = async (data) => {
    try {
      let user = new UserModel(data);
      return await user.save();
    } catch (exception) {
      throw exception;
    }
  };
  getUserByFilter = async (filter = {}) => {
    try {
      let userDetail = await UserModel.find(filter);
      return userDetail;
    } catch (exception) {
      throw exception;
    }
  };
  updateUser = async (id, data) => {
    try {
      let response = await UserModel.findByIdAndUpdate(id, {
        $set: data,
      });
      return response;
    } catch (exception) {
      throw exception;
    }
  };
}
const authSvc = new AuthService();
export default authSvc;
