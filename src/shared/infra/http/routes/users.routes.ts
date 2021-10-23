import multer from "multer";
import uploadConfig from "@config/upload";
import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

import UpdateUserAvatarController from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import CreateUserController from "@modules/accounts/useCases/createUser/CreateUserController";
import ProfileUserController from "@modules/accounts/useCases/profileUser/ProfileUserController";
import UpdateProfileUserController from "@modules/accounts/useCases/updateProfileUser/UpdateProfileUserController";

const usersRoute = Router();

const uploadAvatar = multer(uploadConfig); 

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();
const updateProfileUserController = new UpdateProfileUserController();

usersRoute.post("/", createUserController.handle);

usersRoute.use(ensureAuthenticate);
usersRoute.get("/profile", ensureAuthenticate, profileUserController.handle);
usersRoute.put("/profile", ensureAuthenticate, updateProfileUserController.handle);
usersRoute.patch("/avatar", ensureAuthenticate, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export { usersRoute };