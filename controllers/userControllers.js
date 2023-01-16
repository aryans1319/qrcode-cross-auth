const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const register = asyncHandler ( async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
      try {
        if (!(firstName && lastName && email && password)) {
          return res.status(400).json({
            message: "All fields are compulsory",
          });
        }
  
        const existingUser = await User.findOne({
          email: email,
        });
  
        if (existingUser) {
          return res.status(409).json({
            message: "User already exists",
          });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newUser = await User.create({
          firstName: firstName,
          lastName:lastName,
          email: email,
          password: hashedPassword,
        });

        const token = jwt.sign(
            { user_id: newUser._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
        );

        res.status(201).json({
          user: newUser,
          token: token
        });

      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Something went wrong",
        });
      }
});

module.exports = { 
    register
} 