import router from "./configRouter"
import multer from "multer"
import FilesController from "../controllers/FilesController"

const storage = multer.memoryStorage()
const upload = multer({ storage })

export default [
  router.post("/files", upload.single("file"), FilesController.create),
]
