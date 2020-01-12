// Validate if register Input is empty
const validateRegistration = (data) => {
  let errors = {};
  if(!data.name){
    errors.name = "Name field is required";
  }
  if(!data.email){
     errors.email = "Email field is required";
  }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)){
     errors.email = "Email is invalid";
  }
  if(!data.password){
    errors.password = "Password field is required";
  }else if(data.password.length < 8){
    errors.password = "Password must be at least 8 characters";
  }
  if(!data.password2){
    errors.password2 = "Confirm password field is required";
  }
  if(data.password !== data.password2){
    errors.password2 = "Passwords must match";
  }
  return {
    errors
  };
};

// Validate if login Input is empty
const validateLogin = (data) => {
  let errors = {};

  if(!data.email){
     errors.loginEmail = "Email field is required";
  }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)){
     errors.loginEmail = "Email is invalid";
  }
  if(!data.password){
    errors.loginPassword = "Password field is required";
  }
  return {
    errors
  };
};

// validate password change inputs
const validateChangePassword = (data) => {
  let errors = {};

  if (!data.currentPassword) {
    errors.currentPassword = "Password field is required";
  }
  if (!data.newPassword) {
    errors.newPassword = "New Password field is required";
  }else if (data.newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters";
  }
  if (!data.newPassword2) {
    errors.newPassword2 = "New Confirm password field is required";
  }
  if (data.newPassword !== data.newPassword2) {
    errors.newPassword2 = "Passwords must match";
  }
  return {
    errors
  };
};

module.exports = {validateRegistration, validateLogin, validateChangePassword};
