import exress from "express"
import auth from "../../middleware/auth.js"
import validation from "../../middleware/validation.js"
import { userLogin, userRegister, userUpdate } from "./user.controller.js"
import { userLoginValidationSchema, userRegisterValidationSchema, userUpdateValidationSchema } from "./user.validation.js"

const userRoutes = exress.Router()


userRoutes.post("/register", validation(userRegisterValidationSchema), userRegister);
userRoutes.post("/login", validation(userLoginValidationSchema), userLogin);
userRoutes.patch("/:id",[auth,validation(userUpdateValidationSchema)], userUpdate);
















export default userRoutes;
