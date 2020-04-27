const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// @route   POST api/receiveNewPassword/:userId/:token
// @desc    Update user password
// @access  Public
router.post('/:userId/:token', (req, res) => {
    const { userId, token } = req.params
    const { password } = req.body
    // highlight-start
    User.findOne({ _id: userId })
      .then(user => {
        const secret = user.password + "-" + user.register_date
        const payload = jwt.decode(token, secret);
        if (payload.id === user.id) {
          bcrypt.genSalt(10, function(err, salt) {
            // Call error-handling middleware:
            if (err) return
            bcrypt.hash(password, salt, function(err, hash) {
              // Call error-handling middleware:
              if (err) return
              User.findOneAndUpdate({ _id: userId }, { password: hash })
                .then(() => res.status(202).json("הסיסמה עודכנה בהצלחה"))
                .catch(err => res.status(500).json(err))
            })
          })
        }
      })
      // highlight-end
      .catch(() => {
        res.status(404).json("משתמש לא תקין")
      })
});

module.exports = router;
