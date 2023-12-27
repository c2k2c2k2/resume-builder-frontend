const Joi = require('joi');

//schema for basic info
const basicInfoSchema = Joi.object({
    name: Joi.string().required(),
    title: Joi.string().required(),
    linkedin: Joi.string().required(),
    github: Joi.string().required(),
    email: Joi.string().required(), // Assuming you want to validate the email format
    phone: Joi.string().required(), // Add .pattern() if you want to validate phone format
});

// Schema for education
const educationSchema = Joi.object({
    title: Joi.string().required(),
    college: Joi.string().required(),
    startDate: Joi.string().required(), // or use Joi.date() if working with date objects
    endDate: Joi.string().required() // or use Joi.date() for date validation
});

// Schema for projects
const projectsSchema = Joi.object({
    link: Joi.string().uri().required(),
    title: Joi.string().required(),
    overview: Joi.string().required(),
    github: Joi.string().uri(), // Assuming it's a URL; make it required as needed
    points: Joi.array().items(Joi.string().required()).required()
});

// Schema for workExperience
const workExperienceSchema = Joi.object({
    title: Joi.string().required(),
    companyName: Joi.string().required(),
    certificationLink: Joi.string().uri(), // Assuming it's a URL; make it required as needed
    startDate: Joi.string().required(), // or use Joi.date() for date validation
    endDate: Joi.string().required(), // or use Joi.date() for date validation
    location: Joi.string().required(),
    points: Joi.array().items(Joi.string().required()).required()
});

const achievementSchema = Joi.array().items(Joi.string().required()).required();
const summarySchema = Joi.string().required();
const otherSchema = Joi.string().required();

// Export the schemas if needed
module.exports = { basicInfoSchema, educationSchema, projectsSchema, workExperienceSchema, achievementSchema, summarySchema, otherSchema };