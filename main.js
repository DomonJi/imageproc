const {app, BrowserWindow} = require('electron')
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

let win
function createWindow() {
  win = new BrowserWindow({width: 700, height: 840})
  win.loadURL(`file://${__dirname}/index.html`)
  win.on('closed', () => {
    win = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

ipc.on('open-file-dialog', function(event) {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, function(files) {
    if (files)
      event.sender.send('selected-directory', files)
  })
})
