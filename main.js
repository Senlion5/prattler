const { app, BrowserWindow, ipcMain, Notification, Menu, Tray } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

const appIcon = path.join(__dirname, 'assets', 'images', 'prattlerIconSmaller.png');
const dockIcon = path.join(__dirname, 'assets', 'images', 'prattlerIconSmall.png');
const trayIcon = path.join(__dirname, 'assets', 'images', 'prattlerIconSmaller.png');

function createSplashWindow() {
    const win = new BrowserWindow({
       width: 420,
       height: 260,
       backgroundColor: '#f0f7de',
       frame: false,
       windowRadius: 10,
       webPreferences: {
           nodeIntegration: false,
           contextIsolation: true,
           enableRemoteModule: true
       } 
    })

    win.loadFile('splash.html');
    return win;
}

function createWindow() {

    const win = new BrowserWindow({
       width: 1360,
       minWidth: 680,
       height: 920,
       icon: appIcon,
       backgroundColor: '#f0f7de',
       show: false,
       webPreferences: {
           nodeIntegration: false,
           contextIsolation: true,
           enableRemoteModule: true,  
           preload: path.join(__dirname, 'preload.js')
       } 
    })

    win.loadFile('index.html');
    isDev && win.webContents.openDevTools();
    return win;
}

if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

if (process.platform === 'darwin') {
    app.dock.setIcon(dockIcon);
}

let tray = null;
app.whenReady().then(() => {
    const template = require('./menu/Menu').createTemplate(app);
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    tray = new Tray(trayIcon);
    tray.setContextMenu(menu);

    const splash = createSplashWindow();
    const mainApp = createWindow();

    mainApp.once('ready-to-show', () => {
      setTimeout(() => {
        splash.destroy();
        mainApp.show();
      }, 400)
    })
});

app.setAppUserModelId(process.execPath);

ipcMain.on('notify', (_, message) => {
    new Notification({title: 'ALERT', body: message}).show();
})

ipcMain.on('app-quit', () => {
    app.quit();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})
