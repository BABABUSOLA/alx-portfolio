import { Router } from "express";
import FilesController from "../controllers/files.controller.js";

const router = Router();

router.post("/upload", FilesController.uploadFile);