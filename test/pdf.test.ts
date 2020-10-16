import request from "supertest";
import app from "../src/app";
const endpointUrl = "/generatePDF/";
describe("GET /", () => {
    it("should return 404 OK", (done) => {
        request(app).get("/")
            .expect(404, done);
    });
});


describe("POST" + endpointUrl, () => {
    it("POST " + endpointUrl + "with invalid param", async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send({ content: "" });
        expect(response.status).toBe(200);
        expect(response.body[0].msg).toEqual('content cannot be blank');
    });
});



describe("POST /generatePDF", () => {
    it("POST " + endpointUrl + "with valid param", async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send({ content: "<H1> Hello </H1>" });
        expect(response.status).toBe(200);
    });
});


describe("POST /generatePDF", () => {
    it("POST " + endpointUrl + "with valid param and with file name", async () => {
        let inputFileName = 'test.pdf';
        const response = await request(app)
            .post(endpointUrl)
            .send({ content: "<H1> Hello </H1>", "filename": inputFileName });
        let filename;
        let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        let matches = filenameRegex.exec(response.header['content-disposition']);
        if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
        }
        expect(response.status).toBe(200);
        expect(inputFileName).toEqual(filename);
    });
});


describe("POST /generatePDF", () => {
    it("POST " + endpointUrl + "with valid param and with out file name", async () => {
        let inputFileName = 'test.pdf';
        const response = await request(app)
            .post(endpointUrl)
            .send({ content: "<H1> Hello </H1>" });
        let filename;
        let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        let matches = filenameRegex.exec(response.header['content-disposition']);
        if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
        }
        expect(response.status).toBe(200);
        expect('IFMS2.0-Data.pdf').toEqual(filename);
    });
});