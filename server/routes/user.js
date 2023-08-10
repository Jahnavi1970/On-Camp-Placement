import express from "express";
import * as studentController from "./../controllers/student.js";
import * as adminController from "./../controllers/admin.js";

const router = express.Router();

router.post("/student/sign-in", studentController.signIn);

router.post("/student/sign-up", studentController.signUp);

router.post("/admin/sign-in", adminController.signIn);

router.post("/admin/sign-up", adminController.signUp);

export default router;
