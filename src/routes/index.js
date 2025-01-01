import { Router } from "express";
import sendMesssage from "../controller/sendmessage.js";
import addCertificate from "../controller/addCertificate.js";
import upload from "../S3/awsConfig.js";

const Routes = Router();

Routes.post("/sendMesssage", sendMesssage);
Routes.post("/uploadCertificate", upload.single("file"), addCertificate);

export default Routes;
