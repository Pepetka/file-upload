import uploadPage from "../pages/uploadPage.ts";
import mainPage from "../pages/mainPage.ts";
import downloadPage from "../pages/downloadPage.ts";
import notFoundPage from "../pages/notFoundPage.ts";
import fileUpload from "../js/fileUpload.ts";
import fileDownload from "../js/fileDownload.ts";

const router = () => {
	const hash = window.location.hash.slice(2);

	let pageContent: string;
	let pageScript: (() => void) | undefined = undefined;

	switch (hash) {
		case '':
			pageContent = mainPage();
			break;
		case 'upload':
			pageContent = uploadPage();
			pageScript = fileUpload;
			break;
		case 'download':
			pageContent = downloadPage();
			pageScript = fileDownload;
			break;
		default:
			pageContent = notFoundPage();
	}

	return {
		pageContent,
		pageScript,
	};
};

export default router;
