import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserReceiveComplimentController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUserSendComplimentController } from "./controllers/ListUserSendComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentController();
const listUserSendComplimentController = new ListUserSendComplimentController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post("/tags",ensureAuthenticated,ensureAdmin, createTagController.handle);
router.get("/tags",ensureAuthenticated,listTagsController.handle);

router.post("/users", createUserController.handle);
router.get("/users",ensureAuthenticated, listUsersController.handle);

router.post("/login", authenticateUserController.handle);
router.post("/compliments",ensureAuthenticated, createComplimentController.handle);
router.get("/users/compliments/send",ensureAuthenticated, listUserSendComplimentController.handle )
router.get("/users/compliments/receive",ensureAuthenticated, listUserReceiveComplimentsController.handle )

export { router }