const mongoose = require('mongoose')

const { Schema } = mongoose

const employeeSchema = new Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    college: String,
    branch: String,
    specialization: String,
    phoneNumber: String,
    githubLink: String,
    resume: String,
    profileImage: String
  })

const Employee = mongoose.models['employee'] || mongoose.model('employee', employeeSchema)

module.exports = { Employee }