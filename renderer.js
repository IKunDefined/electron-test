const { ipcRenderer } = require('electron')

let button = document.getElementById('test-click-button')

button.onclick = () => {
    console.log(ipcRenderer.sendSync('renderer-message', 'request github'))
}