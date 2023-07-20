import './css/style.css';
import Navigo from "navigo";
import mainPage from "./pages/mainPage.ts";
import uploadPage from "./pages/uploadPage.ts";
import downloadPage from "./pages/downloadPage.ts";
import notFoundPage from "./pages/notFoundPage.ts";
import fileUpload from "./js/fileUpload.ts";
import fileDownload from "./js/fileDownload.ts";

window.addEventListener('DOMContentLoaded', () => {
	const router = new Navigo('/');

	const app = document.querySelector<HTMLDivElement>('#app')!;
	const nav = document.createElement('nav');
	const outlet = document.createElement('div');

	nav.innerHTML = `
		<ul>
			<li><a href="/" data-navigo>Main</a></li>
			<li><a href="/upload" data-navigo>Upload</a></li>
			<li><a href="/download" data-navigo>Download</a></li>
		</ul>
	`;


	app.appendChild(nav);
	app.appendChild(outlet);

	router.on('/', () => {
		outlet.innerHTML = mainPage();
	});
	router.on('/upload', () => {
		outlet.innerHTML = uploadPage();
		setTimeout(fileUpload);
	});
	router.on('/download', () => {
		outlet.innerHTML = downloadPage();
		setTimeout(fileDownload);
	});
	router.notFound(() => {
		outlet.innerHTML = notFoundPage();
	})

	router.resolve();
});
