import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdir } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url))

const filesDir = join(__dirname, 'uploads');

const app = express();
app.use(express.json());
app.use(express.static(filesDir));
app.use(cors());

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, filesDir);
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({ storage });

app.post('/upload', upload.array('images'), (req, res) => {
	try {
		if (req.files.length) {
			res.send('Файлы успешно загружены');
		} else {
			res.status(400).send('Файлы отсутствуют');
		}
	} catch (e) {
		console.error(e.message);
		res.status(500).send('Ошибка загрузки файлов');
	}
});

app.get('/download', (req, res) => {
	readdir(filesDir, (err, files) => {
		if (err) {
			console.error('Ошибка чтения папки картинок:', err);
			res.status(500).json({ error: 'Ошибка сервера' });
		}

		const imageFiles = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.svg'));
		const images = imageFiles.map(filename => ({ filename }));

		res.json(images);
	});
});

export default app;
