import nc from "next-connect"
import connectDB from "../../../connectDB"

import { registerSocial } from "../../../controllers/authCont"

import onError from "../../../middlewares/errors"

const router = nc({ onError })

connectDB()

router.post(registerSocial)

export default router
