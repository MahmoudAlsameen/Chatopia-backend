import Joi from "joi"

const userRegisterValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/)
    .required(),
  userName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/),
  fullName: Joi.string()
    .required(),
  gender: Joi.string()
    .valid('male', 'female')
    .required(),
})


const userLoginValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/)
    .required(),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/),

})


const userUpdateValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/),
  userName: Joi.string()
    .alphanum()
    .min(3)
    .max(30),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/),
  fullName: Joi.string(),
  gender: Joi.string()
    .valid('male', 'female'),
})











export { userRegisterValidationSchema, userLoginValidationSchema, userUpdateValidationSchema }
