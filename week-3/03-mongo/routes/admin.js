const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin, Course} = require('../db/index.js');
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const adminExist = await Admin.findOne({
        username: username,
        password: password
    });
    if(adminExist){
        res.json({
            msg: "Admin with username exists"
        })
        //next();
    }else{
        Admin.create({
            username: username,
            password: password
        }).then(function(){
            res.json({
                message: "Admin created successfully"
            })
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const newCourse = await Course.create({
        title,
        description,
        price,
        imageLink
    }); 
    res.json({
        msg: "Course created successfully",
        courseId: newCourse._id
    });
    
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({}).then(function(response){
        res.json({
            courses: response
        })
    })
});

module.exports = router;