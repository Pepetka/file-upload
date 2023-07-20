const uploadPage = () => {
	return `
		<div class="wrapper">
			<h1>File Upload</h1>
			<form>
				<input type="file" name="images" accept="image/*" multiple style="display: none" />
				<div class="notificationWrapper">
					<button class="add" type="button">Добавить</button>
					<div class="notification">0</div>
				</div>
				<button class="upload" type="submit">Загрузить</button>
			</form>
			<div class="preview"></div>
		</div>
	`
};

export default uploadPage;
