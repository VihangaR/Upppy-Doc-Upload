const Dashboard = Uppy.Dashboard;
const XHRUpload = Uppy.XHRUpload;
const Dropbox = Uppy.Dropbox;
const Url = Uppy.Url;

// Here we set the restrictions of the max file size (10MB), number of files allowed (1), and the type (pdf)
const uppy = Uppy.Core({
	restrictions: {
		maxFileSize: 1000000,
		maxNumberOfFiles: 1,
		allowedFileTypes: [".pdf"],
	},
});

// The main Dashboard plugin itself
uppy.use(Dashboard, {
	inline: true,
	target: "#uppy-area",
});
// The way we'll be uploading (basically a POST request)
uppy.use(XHRUpload, {
	endpoint: "/uploadpdf",
	formData: true,
	fieldName: "pdfUpload",
});
// Dropbox plugin
uppy.use(Dropbox, {
	target: Dashboard,
	companionUrl: "https://companion.uppy.io/",
});
// Plugin to get file from a URL
uppy.use(Url, {
	target: Dashboard,
	companionUrl: "https://companion.uppy.io/",
});
// Executes when a file successfully uploads
uppy.on("upload-success", (file, response) => {
	if (response.status === 200) {
		// Create the node to append to the story list
		const storyNode = document.querySelector("#story-list");
		const tempNode = document.createElement("div");
		tempNode.innerHTML = `<div class="short-story-link">
                                <a href="/download/${response.body.fileName}">${response.body.fileName}</a>
                            </div>`;
		const childEl = tempNode.childNodes[0];
		// Add it to the beginning of the story list
		storyNode.insertBefore(childEl, storyNode.childNodes[0]);
	}
});
