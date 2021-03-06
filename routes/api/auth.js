const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');


// User Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if(!email || !password) {
    return res.status(400).json({ msg: 'אנא מלא את כל השדות הדרושים' });
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(!user) return res.status(400).json({ msg: 'המשתמש לא קיים במערכת' });

      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ msg: 'סיסמה שגויה' });

          jwt.sign(
            { id: user.id },
            process.env.jwtSecret,
            { expiresIn: 3600 },
            (err, token) => {
              if(err) throw err;
              res.json({
                token,
                user: {
                  _id: user.id,
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
        })
    })
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;