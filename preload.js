const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  store: {
    get: (key) => ipcRenderer.invoke('store-get', key),
    set: (key, val) => ipcRenderer.invoke('store-set', key, val),
  },
  win: {
    minimize: () => ipcRenderer.send('win-minimize'),
    close: () => ipcRenderer.send('win-close'),
    toggleOnTop: () => ipcRenderer.send('win-toggle-ontop'),
  },
  onOnTopChanged: (callback) => {
    ipcRenderer.on('ontop-changed', (_event, val) => callback(val));
  },
});
