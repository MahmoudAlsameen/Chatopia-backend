import exress from "express";
import auth from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";
import {
  userChangePassword,
  userDelete,
  userLogin,
  userRegister,
  userUpdate,
} from "./user.controller.js";
import {
  userChangePasswordValidationSchema,
  userDeleteValidationSchema,
  userLoginValidationSchema,
  userRegisterValidationSchema,
  userUpdateValidationSchema,
} from "./user.validation.js";

const userRoutes = exress.Router();

userRoutes.post(
  "/register",
  validation(userRegisterValidationSchema),
  userRegister
);
userRoutes.post("/login", validation(userLoginValidationSchema), userLogin);
userRoutes.patch(
  "/:id",
  [auth, validation(userUpdateValidationSchema)],
  userUpdate
);
userRoutes.delete("/:id", [
  auth,
  validation(userDeleteValidationSchema),
  userDelete,
]);
userRoutes.patch(
  "/password/:id",
  [auth, validation(userChangePasswordValidationSchema)],
  userChangePassword
);

export default userRoutes;
