const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
	const mainWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: false
		}
	});

	// and load the index.html of the app.
        mainWindow.loadFile(require.resolve('./index.html'));
});

app.on('window-all-closed', function () {
	app.quit();
});
