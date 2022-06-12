const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { schema } = require("../models/User");
const { registerValidation, loginValidation } = require ('../validation');


const registerUser = async (req, res) => {
  const {error} = registerValidation(req.body);
 if(error) return res.status(400).send(error.details[0].message);


  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    res.status(400).send("User already exists!");
  }

  const salt = await bcrypt.genSalt(10); 
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          isAdmin: user.isAdmin,
        });
      } else {
        res.status(400).json({msg: "Error!"})
      }
}

//LOGIN
const loginUser = async(req, res) => {

  const {error} = loginValidation(req.body);
 if(error) return res.status(400).send(error.details[0].message);

 const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send("Email is not found");
  }

  //verifica daca parola este corecta
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('Invalid password');

  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('user-token', token).send(token);

  res.send('Logged in!');

  
}

module.exports = {registerUser, loginUser};
