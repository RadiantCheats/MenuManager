const { app, BrowserWindow } = require('electron');
require('dotenv').config()
const MakeWindow = () => {
    const win = new BrowserWindow({
        webPreferences: {
            preload: __dirname + "/dist/js/preload.js"
        },
        height: 800,
        width: 1200,
        icon: __dirname + "/dist/images/logo.png"
    })

    win.center()
    win.setFullScreenable(false)
    win.setHasShadow(false)
    win.setMenu(null)
    win.loadFile('views/index.html')

    win.webContents.on('new-window', function (e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
    });
}

app.on('ready', async () => {
    MakeWindow()
    const { session } = require('electron')

    // get cookies for radiant website to show correct menus.
    const cookies1 = await session.defaultSession.cookies.get({ url: 'https://radiantcheats.net/index.php?fc=module&module=serialnumbers&controller=showTable' })
    let cookies = "";
    cookies1.forEach((cookie) => {
        cookies += `${cookie.name}=${cookie.value}&`
    })

    process.env.MenuManager.cookies = cookies
    console.log(cookies)
})