import router from "./configRouter"
import UsersController from "../controllers/UsersController"

export default [router.get("/users", UsersController.index)]
