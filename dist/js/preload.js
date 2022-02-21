const node_fetch = require("node-fetch-commonjs");
const MenuManager = process.env.MenuManager;

fetch('https://radiantcheats.net/index.php?fc=module&module=serialnumbers&controller=showTable', {
    headers: {
        cookie: MenuManager.cookies
    }
}).then(async res => {
    window.agipgpreg = await res.text()
    console.log(await window.agipgpreg)
})