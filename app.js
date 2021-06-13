const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
	console.log("Server started on port:", PORT);
});

// Use ejs for templating
app.set("view engine", "ejs");
// Use the static files in the public directory
app.use(express.static(__dirname + "/public"));
// Lets us parse nested objects
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
	destination: `${__dirname}/storage/`,
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
const uploadPDF = multer({ storage }).single("pdfUpload");

// Get Requests
app.get("/", (req, res) => {
	const fileNames = [];
	fs.readdirSync(`${__dirname}/storage`).forEach((file) => {
		fileNames.push(file);
	});
	res.render("index", { fileNames });
});

app.get("/download/:pdfName", (req, res) => {
	const pdfName = req.params.pdfName;

	return res.download(`${__dirname}/storage/${pdfName}`);
});

// Post Requests
app.post("/uploadpdf", uploadPDF, (req, res) => {
	console.log(req.file);
	if (req.file) {
		return res.json({
			message: "Uploaded Successfully!",
			fileName: req.file.originalname,
		});
	}
	return res.json({ message: "Upload Failed." });
});
