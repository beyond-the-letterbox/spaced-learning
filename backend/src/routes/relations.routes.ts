import {Router} from "express";
import {authenticateToken} from "../middleware";
import {relationsController} from "../controllers";

const router = Router();

router.post('/',  authenticateToken, relationsController.createRelation);



export default router;
