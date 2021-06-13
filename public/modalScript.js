// Just modal related JS
document.querySelector("#upload-button").addEventListener("click", (event) => {
	document.querySelector(".modal").classList.add("is-active");
	document.querySelector("html").classList.add("is-clipped");
});
document
	.querySelector(".modal-background")
	.addEventListener("click", (event) => {
		document.querySelector(".modal").classList.remove("is-active");
		document.querySelector("html").classList.remove("is-clipped");
	});
document.querySelector(".modal-close").addEventListener("click", (event) => {
	document.querySelector(".modal").classList.remove("is-active");
	document.querySelector("html").classList.remove("is-clipped");
});
