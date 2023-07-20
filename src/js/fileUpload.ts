import axios from 'axios';

const api = import.meta.env.VITE_API;

const fileUpload = () => {
	const wrapper = document.querySelector<HTMLDivElement>('.wrapper')!;
	const preview = document.querySelector<HTMLDivElement>('.preview')!;
	const form = document.querySelector<HTMLFormElement>('form')!;
	const fileInput = document.querySelector<HTMLInputElement>('input')!;
	const addButton = document.querySelector<HTMLButtonElement>('.add')!;
	const uploadButton = document.querySelector<HTMLButtonElement>('.upload')!;
	const notification = document.querySelector<HTMLDivElement>('.notification')!

	const onClear = () => {
		form.reset();
		preview.innerHTML = '';
		notification.textContent = '0';
		notification.style.display = 'none';
	};

	addButton.addEventListener('click', () => {
		fileInput.click();
	});

	fileInput.addEventListener('change', () => {
		const selectedFiles = fileInput.files;

		if (!selectedFiles?.length) {
			console.log('Выберете файлы');
			onClear();
			return;
		}

		notification.textContent = `${selectedFiles.length}`;
		notification.style.display = 'block';

		preview.innerHTML = '';

		for (let i = 0; i < selectedFiles.length; i++) {
			const selectedFile = selectedFiles[i];

			const objectUrl = URL.createObjectURL(selectedFile);

			const previewImage = document.createElement('img');
			previewImage.classList.add('previewImage');
			previewImage.src = objectUrl;

			preview.appendChild(previewImage);
		}

		wrapper.appendChild(preview);
	});

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		const files = fileInput.files;

		if (!files?.length) {
			console.log('Выберете файл');
			return;
		}

		uploadButton.textContent = 'Отправка...';

		const formData = new FormData();

		for (let i = 0; i < files.length; i++) {
			formData.append('images', files[i], files[i].name);
		}

		axios.post(`${api}/upload`, formData)
			.then(res => {
				onClear();
				console.log(`Файл успешно загружен. Статус: ${res.status}`);
			})
			.catch(error => {
				console.error('Ошибка загрузки файла:', error);
			})
			.finally(() => {
				uploadButton.textContent = 'Загрузить';
			});
	});
};

export default fileUpload;
