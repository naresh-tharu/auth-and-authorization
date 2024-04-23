const helpers = {
  randomStringGenerate: (len = 100) => {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let length = chars.length;
    let randomString = "";
    for (let i = 0; i < len; i++) {
      let posn = Math.floor(Math.random() * (length - 1));
      randomString += chars[posn]
    }
    return randomString;
  }

}
export { helpers }