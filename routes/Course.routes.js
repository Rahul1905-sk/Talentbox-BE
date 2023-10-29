

const express = require('express');
const { CourseModel } = require('../model/Course.model');
 
const courseRoutes = express.Router()

 

// get all courses
courseRoutes.get("/", async(req,res,next) => {

  
    try {
      
        const course = await CourseModel.find();
        res.status(200).send(course)
 

      } catch (error) {
        res.status(400).send({ err: error.message });
      }
})


// create course
courseRoutes.post("/create", async(req,res,next) => {

    try {

      const newCourse = new CourseModel(req.body)
      await newCourse.save()
        
        res.status(200).send({"msg": "course created"})
       
      } catch (error) {
        res.status(400).send({ err: error.message });
      }
})


// // update posts
// courseRoutes.patch("/update/:id", async(req,res,next) => {

//   const {id} = req.params
//     try {
//       await CourseModel.findByIdAndUpdate({userID: req.body.userID, _id:id}, req.body);
     

//         res.status(200).send({"msg": "post updated"})
       
//       } catch (error) {
//         res.status(400).send({ err: error.message });
//       }
// })

// // delete posts
// courseRoutes.delete("/delete/:id", async(req,res,next) => {

//   const {id} = req.params
//     try {
//       await CourseModel.findByIdAndDelete({userID: req.body.userID, _id:id});
     

//         res.status(200).send({"msg": "post deleted"})
       
//       } catch (error) {
//         res.status(400).send({ err: error.message });
//       }
// })


module.exports = {
    courseRoutes
}