import { Router } from "express";
import { createShortLink, redirectToOriginal } from "../controllers/linkControllers.js";

const router = Router();

router.route("/")
    .post(createShortLink)



export default router;