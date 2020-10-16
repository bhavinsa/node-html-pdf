import express from "express";
// Controllers (route handlers)
import * as pdfController from "../controllers/pdf";

// Create Express server
const app = express();
const routes = app;

/**
 * Primary app routes.
 */
app.get("/getPdf", pdfController.getPdf);
app.post("/generatePDF", pdfController.generatePDF);


export default routes;