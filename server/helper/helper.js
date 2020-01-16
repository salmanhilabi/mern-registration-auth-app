const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const nodemailer = require("nodemailer");
const MongoUser = require("../mongodb/models/mongo_user");
const User = require("../mysql/models/mysql_user");

// Send successfull registeration email to the user
const sendMail = (email, name) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "salman.webdeveloper2018@gmail.com", // add an email here to be able to send mail through it
      pass: keys.emailPassword // add email password
    }
  });
  const mailOptions = {
    from: "salman.webdeveloper2018@gmail.com", // sender address
    to: email,
    subject: "MERN STACK REGISTRATION WEB APP", // Subject line
    html: `<p>Hey ${name}, <br/> Your temporary Email have been successfully registerd</p>` // plain text body
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.log(err);
    done();
  });
};

// Check if user doesn't exist then create a new user
const registerUser = async ({ name, email, password, res }) => {
  // MongoDB Database registration
  return await MongoUser.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }
    // bcrypt encrypts the password before it goes to th database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        const newUser = new MongoUser({
          name,
          email,
          password: hash
        });
        newUser
          .save()
          .then(user => {
            res.status(200).json(user);
            sendMail(email, name);
          })
          .catch(err => res.status(400).json(err));
      });
    });
  });
  // MongoDB setup end here

  // Mysql Database registration
  ///////////////////////////////////
  // return await User.findOne({where: {email: email}}).then(user => {
  //    if (user) {
  //      return res.status(400).json({ email: "This Email already exists" });
  //    }
  //    // bcrypt encrypts the password before it goes to th database
  //    bcrypt.genSalt(10, (err, salt) => {
  //      bcrypt.hash(password, salt, (err, hash) => {
  //        if (err) throw err;
  //        password = hash;
  //        User.create({
  //           name,
  //           email,
  //           password
  //         })
  //         .then(user => {
  //            res.status(200).json(user)
  //            sendMail(email, name);
  //         })
  //         .catch(err => console.log(err));
  //      });
  //    });
  // })
  ////////////////////////
  // Mysql setup end here
};

// Check if user does exist then login the user
const loginUser = async ({ email, password, res }) => {
  // MongoDB Database Login
  //////////////////////////
  return await MongoUser.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ notfound: "Email not found" });
    }
    // compare the password that's provided by login user with the encrypted password in the database
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 3600000
          },
          (err, token) => {
            if (err) return console.log(err);
            res.json({
              success: true,
              token: "Token " + token
            });
          }
        );
      } else {
        return res.status(400).json({ incorrect: "Password incorrect" });
      }
    });
  });
  /////////////////////////
  // MongoDB setup end here

  // Mysql Database Login
  ////////////////////////
  // return await User.findOne({where: {email}}).then(user => {
  //   if (!user) {
  //     return res.status(404).json({ notfound: "Email not found" });
  //   }
  //   // compare the password that's provided by login user with the encrypted password in the database
  //   bcrypt.compare(password, user.password).then(isMatch => {
  //       if (isMatch) {
  //         const payload = {
  //           id: user.id,
  //           name: user.name
  //         };
  //         // create a token of a user with the help of jwt
  //         jwt.sign(
  //           payload,
  //           keys.secretOrKey,
  //           {
  //             expiresIn: 3600000
  //           },
  //           (err, token) => {
  //             res.json({
  //               success: true,
  //               token: "Token " + token
  //             });
  //           }
  //         );
  //       } else {
  //         return res.status(400).json({ incorrect: "Password incorrect" });
  //       }
  //     });
  // });
  ///////////////////////
  // Mysql Setup end here
};

// Validate, Encrypt & Change password
const changePassword = async ({ id, currentPassword, newPassword, res }) => {
  // MongoDB Database change password
  ///////////////////////////////////
  return await MongoUser.findOne({ _id: id }).then(user => {
    bcrypt.compare(currentPassword, user.password).then(isMatch => {
      if (!isMatch) {
        return res.status(400).json({
          passwordmismatch: "Current password doesn't match with old password"
        });
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
          if (err) throw err;
          newPassword = hash;
          MongoUser.findOneAndUpdate(
            { _id: id },
            { $set: { password: newPassword } },
            { new: true, useFindAndModify: false },
            (err, user) => {
              res.status(200).json(user);
            }
          );
        });
      });
    });
  });
  //////////////////////////
  // MongoDB setup end here

  // Mysql Database change password
  /////////////////////////////////
  // return await User.findOne({where: {id}}).then(user => {
  //    bcrypt.compare(currentPassword, user.password).then(isMatch => {
  //      if(!isMatch){
  //        return res.status(400).json({ passwordmismatch: "Current password doesn't match with old password" });
  //      }
  //      bcrypt.genSalt(10, (err, salt) => {
  //        bcrypt.hash(newPassword, salt, (err, hash) => {
  //          if(err) throw err;
  //          newPassword = hash;
  //          User.update({password: newPassword}, {where: {id}}).then(user => {
  //            res.status(200).json(user)
  //          })
  //        })
  //      })
  //    })
  // })
  /////////////////////////
  // MongoDB setup end here
};

module.exports = { registerUser, loginUser, changePassword };
