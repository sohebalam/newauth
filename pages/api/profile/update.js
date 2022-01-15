import nc from "next-connect"
import connectDB from "../../../connectDB"

import { updateProfile } from "../../../controllers/authCont"
import { isAuthenticated } from "../../../middlewares/auth"
import onError from "../../../middlewares/errors"

const router = nc({ onError })

connectDB()

router.use(isAuthenticated).put(updateProfile)

export default router
