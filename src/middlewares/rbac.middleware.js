const checkPermission = (checkrole) => {
  return (req, res, next) => {
    try {
      let user = req.authUser;
    if(typeof checkrole ==='string' && user.role.toLowerCase() !==checkrole.toLowerCase()){
        next({code:403, message:"You do not have previlege to access the system.", meta:null})
    }else if(typeof checkrole ==='object' && !checkrole.includes(user.role)){
        next({code:403, message:"You do not have previlege to access the system.", meta:null})
    }else{
        next()
    }
    } catch (exception) {
      next(exception);
    }
  };
};
export { checkPermission };
