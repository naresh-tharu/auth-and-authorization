import UserModel from "./user.model.js";
import "dotenv/config";

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

  // getResetMessage = async (name, token) => {
  //   return `
  //   <h4>Dear ${name}</h4>
  //   <p>If you have tried to reset your password please click or copy paste the following link in the browser.</p>
  //   <a href ="${process.env.FRONTEND_URL}/reset-password/${token}">${process.env.FRONTEND_URL}/reset-password/${token}</a>
  //   <br/>
  //   <p>This token url is valid only for 2 hours.</p>
  //   <p>If this was mistake, please ignore the message.</p>
  //   <p>Regards,</p>
  //   <p>No reply, system</p>
  //   <p><em>Do not reply to this email</em></p>

  //   `;
  // };
}
const authSvc = new AuthService();
export default authSvc;
