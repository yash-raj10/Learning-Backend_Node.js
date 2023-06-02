import express from "express";
import { deleatUser, getAllUsers, getUserDetails, register, updateUser } from "../controllers/user.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", register);


router.route("/userid/:id").get(getUserDetails).put(updateUser).delete(deleatUser);

// these are same
// router.get("/userid/:id", getUserDetails);
// router.put("/userid/:id", updateUser);
// router.delete("/userid/:id", deleatUser);

export default router;