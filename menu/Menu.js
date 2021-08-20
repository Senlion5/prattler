exports.createTemplate = app => {
    return [
      {
        label: process.platform === 'darwin' ? app.getName() : 'App',
        submenu: [{
          label: 'Exit',
          click: () => {
            app.quit();
          }
      }]
      },
      {
      label: 'Edit',
      submenu: [
        {
          label: "Undo",
          accelerator: "CmdOrCtrl+Z",
          selector: "undo:"
        },
        {
          label: "Redo",
          accelerator: "Shift+CmdOrCtrl+Z",
          selector: "redo:"
        },
        {
          type: "separator"
        },
        {
          label: "Cut",
          accelerator: "CmdOrCtrl+X",
          selector: "cut:"
        },
        {
          label: "Copy",
          accelerator: "CmdOrCtrl+C",
          selector: "copy:"
        },
        {
          label: "Paste",
          accelerator: "CmdOrCtrl+V",
          selector: "paste:"
        },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          selector: "selectAll:"
        }
      ]
    }, 
    {
      label: 'View',
      submenu: [{
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: (_, focusedWindow) => {
          if (focusedWindow) {
            if (focusedWindow.id === 1) {
              const { BrowserWindow } = require('electron');
              BrowserWindow.getAllWindows().forEach(win => {
                if (win.id > 1) {
                  win.close();
                }
              })
            }
            focusedWindow.reload()
          }
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: (() => {
          if (process.platform === 'darwin') {
            return 'Ctrl+Command+F'
          } else {
            return 'F11'
          }
        })(),
        click: (_, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
          }
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: (() => {
          if (process.platform === 'darwin') {
            return 'Alt+Command+I'
          } else {
            return 'Ctrl+Shift+I'
          }
        })(),
        click: (_, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.toggleDevTools()
          }
        }
      }, 
    ]
    }, {
      label: 'Window',
      role: 'window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      }, 
    ]
    }, {
      label: 'Help',
      role: 'help',
      submenu: [{
        label: 'Learn More',
        click: () => {
          const { shell } = require('electron');
          shell.openExternal('https://www.electronjs.org/')
        }
      }]
    }]
  }