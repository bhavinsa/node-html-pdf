import async from "async";
import { Request, Response, NextFunction } from "express";
import { check, sanitize, validationResult } from "express-validator";
import * as pdf from "html-pdf";
import * as path from "path";
import logger from "../util/logger";
/**
 * Pdf page.
 * @route GET /getPdf
 */
export const getPdf = (req: Request, res: Response) => {
    const pdfLocation = path.join(__dirname, "../public/");
    const html = "<table style=\"width:100%\"><tr><th>Firstname</th><th>Lastname</th><th>Age</th></tr><tr><td>,'૧'), '2', '૨'),'3','૩'),'4','૪'),'5','૫'),'6','૬'),'7','૭'),'8','૮'),'9','૯'),'0','૦') ;</td><td>Smith</td><td>50</td></tr><tr><td>અર્થ પ્રજા ડ્રમ વૈભવ સ્વર્ગે</td><td>Jackson</td><td>અર્થ પ્રજા ડ્રમ વૈભવ સ્વર્ગે</td></tr></table>";
    const filename = pdfLocation + "pvu.pdf";
    pdf.create(html, { format: "Letter" }).toFile(filename, function (error: any, result: any) {
        if (error) return console.log(error);
        logger.info(result);
        res.download(filename);
    });
};
export const generatePDF = async (req: Request, res: Response) => {
    await check("content", "content cannot be blank").not().isEmpty().run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.send(errors.array());
    } else {
        try {
            const pdfLocation = path.join(__dirname, "../public/");
            const filenamePath = pdfLocation + (req.body.filename ? req.body.filename : "Data.pdf");
            pdf.create(req.body.content, { format: "Letter" }).toFile(filenamePath, function (error: any, result: any) {
                if (error) return console.log(error);
                logger.info(result);
                res.download(filenamePath);
            });
        } catch (error) {
            logger.debug("error" + error);
            res.send(error);
        }
    }
};