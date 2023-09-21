const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const env = process.env.NODE_ENV;
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,

    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  if (env == "dev") {
    win.loadURL("http://localhost:5173/");
  } else {
    win.loadFile("./web/dist/index.html");
  }
  ipcMain.on("debug-win", (evt, arg) => {
    win.webContents.openDevTools();
  });
};
app.whenReady().then(() => {
  if (env != "dev") {
    Menu.setApplicationMenu(null);
  }
  createWindow();
});

ipcMain.on("quit-app", (evt, arg) => {
  app.quit();
});
