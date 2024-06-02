import { randomStringGenerate } from "../../config/helpers.js";

class AuthRequest {
  #data = {};
  constructor(req) {
    this.#data.body = req.body;
    this.#data.file = req.file;
  }
  transformRegisterData() {
    if (this.#data.file) {
      this.#data.body.image = this.#data.file.filename;
    }
    this.#data.body.token = randomStringGenerate();
    this.#data.body.status = "inactive";
    return this.#data.body;
  }
}

export default AuthRequest;
