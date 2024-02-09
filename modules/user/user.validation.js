import Joi from "joi";

// Reusable password validation schema
const userPasswordSchema = Joi.string()
  .pattern(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/
  )
  .required()
  .messages({
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.",
  });

// User Register validation schema
const userRegisterValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/)
    .required(),
  userName: Joi.string().alphanum().min(3).max(30).required(),
  password: userPasswordSchema,
  fullName: Joi.string().required(),
  gender: Joi.string().valid("male", "female").required(),
});

// User Login validation schema
const userLoginValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/)
    .required(),
  password: userPasswordSchema,
});

// User Update validation schema
const userUpdateValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/),
  userName: Joi.string().alphanum().min(3).max(30),
  fullName: Joi.string(),
  gender: Joi.string().valid("male", "female"),
});

// User Change Password validation schema
const userChangePasswordValidationSchema = Joi.object({
  oldPassword: userPasswordSchema,
  newPassword: userPasswordSchema,
});

// User Delete validation schema
const userDeleteValidationSchema = Joi.object({
  password: Joi.string()
    .required()
    .pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/
    ),
});

export {
  userChangePasswordValidationSchema,
  userDeleteValidationSchema,
  userLoginValidationSchema,
  userRegisterValidationSchema,
  userUpdateValidationSchema,
};
