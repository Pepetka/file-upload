import axios from "axios";

const api = import.meta.env.VITE_API;

const fileDownload = () => {
	const imageContainer = document.querySelector('.preview')!;

	axios<{ filename: string }[]>(`${api}/download`)
		.then(res => {
			res.data.forEach((image) => {
				const href = `${api}/${image.filename}`;

				const onClick = () => {
					const imgLink = document.createElement('a');
					imgLink.href = href;
					imgLink.download = image.filename;
					imgLink.click();
				};

				const button = document.createElement('button');
				button.classList.add('clear');

				button.addEventListener('click', onClick);

				const img = document.createElement('img');
				img.classList.add('previewImage');
				img.src = href;

				button.appendChild(img);
				imageContainer.appendChild(button);
			});
		})
		.catch(error => {
			console.error('Ошибка получения списка картинок:', error);
		});
};

export default fileDownload;
