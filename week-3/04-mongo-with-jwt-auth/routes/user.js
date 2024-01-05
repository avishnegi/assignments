const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  const userExist = await User.findOne({
    username,
    password,
  });
  if (userExist) {
    res.json({
      msg: "User doesn't Exist",
    });
  } else {
    User.create({
      username,
      password,
    }).then(function () {
      res.json({
        msg: "User Created Successfully",
      });
    });
  }
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router