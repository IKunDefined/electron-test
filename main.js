const {
app,
BrowserWindow,
ipcMain
} = require('electron')
const axios = require('axios')
const cheerio = require('cheerio')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on('renderer-message', (event, arg) => {
  console.log(arg)
  axios.get("https://github.com/weiyinfu?tab=repositories").then((resp) => {
    console.log(resp, 123)
    var $ = cheerio.load(resp.data);
    var lis = $("#user-repositories-list li");
    var repos = [];
    for (var i = 0; i < lis.length; i++) {
      var li = lis.eq(i);
      var repo = {
        repoName: li.find("h3").text().trim(),
        repoUrl: li.find("h3 a").attr("href").trim(),
        repoDesc: li.find("p").text().trim(),
        language: li.find("[itemprop=programmingLanguage]").text().trim(),
        star: li.find(".muted-link.mr-3").eq(0).text().trim(),
        fork: li.find(".muted-link.mr-3").eq(1).text().trim(),
        forkedFrom: li.find(".f6.text-gray.mb-1 a").text().trim(),
      };
      repos.push(repo);
    }
    event.returnValue = repos
    });
})