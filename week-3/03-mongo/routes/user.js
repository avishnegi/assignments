const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db/index.js");
const userMiddleware = require("../middleware/user");

// User Routes
router.post("/signup", async (req, res) => {
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

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const response = await Course.find({});
  res.json({
    courses: response,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;

  try {
    await User.updateOne(
      {
        username: username,
      },
      {
        $push : {purchasedCourses: courseId }
      }
    );
  } catch (err) {
    console.log(err);
  }
  res.json({
    msg: "Course purchased successfully",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers.username;
  const user = await User.findOne({
    username
  });
  const courseId = user.purchasedCourses;
  const courses = await Course.find({
    _id : {
        "$in": courseId
    }
  });
  //console.log(courses);
  res.json({
    purchasedCourses: courses
  })
});

module.exports = router;
