const express = require('express');
const multer = require('multer');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password, familyname, phone, sizearea, hamamasize, aboutme, imageurl, choosenvegetables, plans, usertype, workingwith, address } = req.body;

  // Simple validation
  if(!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(user) return res.status(400).json({ msg: 'User already exists' });

      const newUser = new User({
        name,
        email,
        password,
        familyname,
        phone,
        sizearea,
        hamamasize,
        aboutme,
        imageurl,
        choosenvegetables,
        plans,
        usertype,
        workingwith,
        address
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                process.env.jwtSecret,
                { expiresIn: 3600 },
                (err, token) => {
                  if(err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      familyname: user.familyname,
                      phone: user.phone,
                      sizearea: user.sizearea,
                      hamamasize: user.hamamasize,
                      aboutme: user.aboutme,
                      imageurl: user.imageurl,
                      choosenvegetables: user.choosenvegetables,
                      plans: user.plans,
                      usertype: user.usertype,
                      workingwith: user.workingwith,
                      address: user.address
                    }
                  });
                }
              )
            });
        })
      })
    })
});

module.exports = router;
