const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password, familyname, phone, sizearea, hamamasize, numberofactivefarms, aboutme, imageurl, choosenvegetables, choosenfieldcrops, plans, usertype, workingwith, address, fieldcropplan } = req.body;

  // Simple validation
  if(!name || !email || !password) {
    return res.status(400).json({ msg: 'אנא מלא את כל השדות הדרושים' });
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(user) return res.status(400).json({ msg: 'המשתמש כבר קיים במערכת' });

      const newUser = new User({
        name,
        email,
        password,
        familyname,
        phone,
        sizearea,
        hamamasize,
        numberofactivefarms,
        aboutme,
        imageurl,
        choosenvegetables,
        choosenfieldcrops,
        plans,
        usertype,
        workingwith,
        address,
        fieldcropplan
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
                      numberofactivefarms: user.numberofactivefarms,
                      aboutme: user.aboutme,
                      imageurl: user.imageurl,
                      choosenvegetables: user.choosenvegetables,
                      choosenfieldcrops: user.choosenfieldcrops,
                      plans: user.plans,
                      usertype: user.usertype,
                      workingwith: user.workingwith,
                      address: user.address,
                      fieldcropplan: user.fieldcropplan
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
