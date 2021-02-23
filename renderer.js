const { ipcRenderer } = require('electron')

let button = document.getElementById('test-click-button')

button.onclick = () => {
    ipcRenderer.send('renderer-message')
}