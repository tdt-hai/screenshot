const puppeteer = require('puppeteer');
require('dotenv').config();

async function postScreenShot(req, res) {
    const body = req.body;
    const folder = './images';
    const width = parseInt(body.width) || 1800;
    const height = parseInt(body.height) || 750;

    const loginUrl = `${body.base_url}/`;
    // C:/Program Files/Google/Chrome/Application/chrome.exe
    // /usr/bin/google-chrome
    const browserOptions = {
        headless: true,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        args: ['--ignore-certificate-errors', '--enable-features=NetworkService', '--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    };
    try {
        browser = await puppeteer.launch(browserOptions);
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        const client = await page.target().createCDPSession();
        await client.send('Security.setIgnoreCertificateErrors', { ignore: true });
        await page.setViewport({ width, height });
        await page.goto(loginUrl, { waitUntil: 'networkidle2' }, { timeout: 0 }); // wait until page load 
        await page.type('input[id="username"]', body.username);
        await page.type('input[id="password"]', body.password);
        await page.click('button[type="submit"]');
        await page.keyboard.press('Enter');
        //xử lý username or password fail
        const firstResponse = await page.waitForResponse(
            `${loginUrl}api/system/sessions`
        );
        if (firstResponse.status() != 200) {
            return res.status(400).send({ "message": "Username or password fail" })
        }
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        const now = Date.now();
        const paths = [];
        const baseurl = `http://${global.HOST || process.env.HOST}:${global.PORT}`;
        for (const i in body.urls) {
            var name = `${now}_${body.urls[i].name}.jpg`;
            await page.goto(`${body.base_url}/${body.urls[i].url}`, { waitUntil: 'networkidle2' }, { timeout: 0 });
            await page.screenshot({ path: `${folder}/${name}`, type: "jpeg", quality: 100, omitBackground: true, fullPage: true });
            paths.push({
                'name': body.urls[i].name,
                'url': `${baseurl}/images/${name}`
            })
        }
        await browser.close();
        console.log({ "message": "success", "images": paths, "status": "1" });
        res.status(200).send({ "message": "success", "images": paths, "status": "1" });

    } catch (err) {
        if (browser) {
            await browser.close();
        }
        console.log("Error", err);
        res.status(500).send({ "error": err.message || err })
    }
}; // 
module.exports = { postScreenShot } 