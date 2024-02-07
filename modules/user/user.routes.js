import exress from "express"
import { userRegister, userLogin } from "./user.controller.js"
import { userRegisterValidationSchema, userLoginValidationSchema } from "./user.validation.js"
import validation from "../../middleware/validation.js"
import auth from "../../middleware/auth.js"

const userRoutes = exress.Router()


userRoutes.post("/register", validation(userRegisterValidationSchema), userRegister);
userRoutes.post("/login", validation(userLoginValidationSchema), userLogin);

















export default userRoutes;
