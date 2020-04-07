const express = require('express');
const multer = require('multer');
const router = express.Router();
const auth = require('../../middleware/auth');
const SendMail = require('../../Services/mail');

// User Model
const User = require('../../models/User');

// @route   POST api/deactivateuser
// @desc    Deactivate user
// @access  Public
router.post('/:id', auth, (req, res) => {
  const { workingwith } = req.body;

  User.findById(req.params.id, function (err, user) {

    try {

      if (!user) throw Error('No account found');

      // no need for else since you are returning early ^
      user.workingwith = workingwith;

      user.save();
      if (!user) throw Error('Something went wrong saving the user');

      var mailOptions = {
        from: 'cogreenhouse09@gmail.com',
        to: 'liron@projects.org.il',
        subject: 'הפסקת מנוי חודשי',
        text: 'המנוי החודשי הופסק'
      };

      SendMail(mailOptions);
  
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
});

module.exports = router;
