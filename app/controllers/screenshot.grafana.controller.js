const puppeteer = require('puppeteer');
require('dotenv').config();

async function postScreenShot(req, res) {
    const body = req.body;

    if (body.base_url == null) {
        return res.status(400).send({ 'message': 'base_url is required' });
    }
    if (body.username == null) {
        return res.status(400).send({ 'message': 'username is required' });
    }
    if (body.password == null) {
        return res.status(400).send({ 'message': 'password is required' });
    }
    if (body.urls == null) {
        return res.status(400).send({ 'message': 'urls is required' });
    }
    if (!Array.isArray(body.urls)) {
        return res.status(400).send({ 'message': 'urls must be valid array name and url' });
    }
    const folder = './image';
    const width = parseInt(body.width) || 1800;
    const height = parseInt(body.height) || 750;
    const loginUrl = `${body.base_url}/login`;
    // C:/Program Files/Google/Chrome/Application/chrome.exe
    // /usr/bin/google-chrome
    const browserOptions = {
        headless: true,
        executablePath: '/usr/bin/google-chrome',
        args: ['--ignore-certificate-errors', '--enable-features=NetworkService', '--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    };
    let browser;
    try {
        browser = await puppeteer.launch(browserOptions);
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        const client = await page.target().createCDPSession();
        await client.send('Security.setIgnoreCertificateErrors', { ignore: true });
        await page.setViewport({ width, height });

        // Perform login
        await page.goto(loginUrl, { waitUntil: 'networkidle0' }, { timeout: 0 });
        await page.type('input[name="user"]', body.username);
        await page.type('input[name="password"]', body.password);
        await page.click('button[type="submit"]');
        await page.keyboard.press('Enter');
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        const now = Date.now();
        const paths = [];
        const baseurl = process.env.HOST || `http://localhost:${global.PORT}`;

        // Take screenshots of each URL
        for (const i in body.urls) {
            const name = `${now}_${body.urls[i].name}.jpg`;
            await page.goto(`${body.base_url}/${body.urls[i].url}`, { waitUntil: 'networkidle0' }, { timeout: 0 });
            await page.screenshot({ path: `${folder}/${name}`, type: "jpeg", quality: 100, omitBackground: true, fullPage: true });
            paths.push({
                'name': body.urls[i].name,
                'url': `${baseurl}/image/${name}`
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

}; // global function closing
module.exports = { postScreenShot} 
