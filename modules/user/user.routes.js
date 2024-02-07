import exress from "express"
import { userRegister, userLogin, userUpdate } from "./user.controller.js"
import { userRegisterValidationSchema, userLoginValidationSchema, userUpdateValidationSchema } from "./user.validation.js"
import validation from "../../middleware/validation.js"
import auth from "../../middleware/auth.js"

const userRoutes = exress.Router()


userRoutes.post("/register", validation(userRegisterValidationSchema), userRegister);
userRoutes.post("/login", validation(userLoginValidationSchema), userLogin);
userRoutes.patch("/:id",[auth,validation(userUpdateValidationSchema)], userUpdate);
















export default userRoutes;
