const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const puppeteerScript = require('./puppeteerScript');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js'),
            contextIsolation: false,
            enableRemoteModule: true,
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('index.html');
}

app.on('ready', createWindow);

ipcMain.on('run-script', async (event, formData) => {
    await puppeteerScript(formData);
    event.reply('script-done', 'Script has completed running.');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
