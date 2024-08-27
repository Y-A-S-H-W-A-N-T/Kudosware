const express = require('express');
const router = express.Router();
const { Employee } = require('../Schema/employeeSchema')
const bcrypt = require('bcrypt');

router.post('/signup',async(req,res)=>{
    const {  firstName, lastName, password, email, college, branch, specialization, phoneNumber, githubLink} = req.body.User
    try{
        const employee = {
            firstName: firstName,
            lastName: lastName,
            password: await bcrypt.hash(password, 10),
            email: email,
            college: college,
            branch: branch,
            specialization: specialization,
            resume: req.body.resume,
            phoneNumber: phoneNumber,
            githubLink: githubLink,
            profileImage: ''
        }
        const newEmployee = new Employee(employee)
        await newEmployee.save()
        console.log(newEmployee)
        res.json({status: 200,user: newEmployee})
    }
    catch(err){
        console.log(err)
        res.json({status: 404})
    }
})

router.post('/login',async(req,res)=>{
    const { email, password } = req.body
    let User = null
    User = await Employee.findOne({ email: email})
    console.log(User)
    if(User===null){
        console.log("No User with this email")
        res.json({status: 404}).send()
        return
    }
    const Auth = await bcrypt.compare(password, User.password)
    console.log(Auth)
    if(!Auth){
        res.json({status: 404}).send()
        return
    }
    res.json({status: 200, user: User})
})

router.post('/pfp',async(req,res)=>{
    const { profileImage, email } = req.body
    let User = null
    User = await Employee.findOne({ email: email})
    User.profileImage = profileImage

    await User.save()
    res.json({status: 200, user: User})
})



module.exports = router;