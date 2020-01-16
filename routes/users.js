const express = require("express");
const router = express.Router();
const { validateRegistration, validateLogin, validateChangePassword } = require("../validation/inputs_validation");
const { registerUser, loginUser, changePassword } = require('../helper/helper');

// validate and then register a user if user doesn't exist
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const { errors } = validateRegistration(req.body);
  if(Object.keys(errors).length === 0){
    return registerUser({name, email, password, res})
  }
  res.status(400).json(errors);
})

// validate and then login a user if user account already exist in the database
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const { errors } = validateLogin(req.body);
  if(Object.keys(errors).length === 0){
    return loginUser({email, password, res})
  }
  res.status(400).json(errors);
});

// validate the input and then change password of the user
router.put("/update:id", (req, res) => {
  const id = req.params.id;
  const {currentPassword, newPassword } = req.body;
  const { errors } = validateChangePassword(req.body);
  if (Object.keys(errors).length === 0) {
    return changePassword({id, currentPassword, newPassword, res})
  }
  res.status(400).json(errors);
});

module.exports = router;
