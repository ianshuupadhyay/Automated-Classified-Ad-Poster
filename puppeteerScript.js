const puppeteer = require('puppeteer');
const path = require('path');

const websites = [

    {
        base: 'https://www.thefreeadforum.com',
        login: '/classifieds/user/login',
        publish: '/postclassifieds/item/new'
    },
    {
        base: 'https://www.quickpostads.com',
        login: '/user/login',
        publish: '/item/new'
    },
    {
        base: 'https://marketadclassifieds.com',
        login: '/user/login',
        publish: '/item/new'
    },
    {
        base: 'https://promohubspotlight.com',
        login: '/user/login',
        publish: '/item/new'
    },
    {
        base: 'https://listcomet.com',
        login: '/user/login',
        publish: '/item/new'
    },
    {
        base: 'https://www.madclassifiedadnetwork.com',
        login: '/user/login',
        publish: '/item/new'
    },
    {
        base: 'https://classifieds-plus.com',
        login: '/user/login',
        publish: '/item/new'
    },
    {
        base: 'https://homebizlistings.com',
        login: '/user/login',
        publish: '/item/new'
    },
    {
        base: 'https://turbojetclassifieds.com',
        login: '/user/login',
        publish: '/item/new'
    },
    {
        base: 'https://advertisingclassified.com',
        login: '/user/login',
        publish: '/item/new'
    },
    
    {
        base: 'https://adzonedirect.com',
        login: '/user/login',
        publish: '/item/new'
    },
    {
        base: 'https://worldslargestclassifieds.com',
        login: '/user/login',
        publish: '/item/new'
    }
];

async function runPuppeteerScript(formData) {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--start-maximized'],
        userDataDir: 'C:\\Users\\Anshu\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 19'
    });

    const pages = await browser.pages();
    const firstPage = pages[0];

    for (let site of websites) {
        const page = await browser.newPage();

        try {
            await page.goto(`${site.base}${site.login}`);
            console.log(`Opened login page for ${site.base}`);

            const emailFieldExists = await page.$('#email') !== null;
            const passwordFieldExists = await page.$('#password') !== null;

            if (emailFieldExists && passwordFieldExists) {
                await page.type('#email', 'you@gmail.com');
                console.log(`Filled in email for ${site.base}`);
                await new Promise(res => setTimeout(res, 2000));

                await page.type('#password', 'you@password');
                console.log(`Filled in password for ${site.base}`);
                await new Promise(res => setTimeout(res, 2000));

                await Promise.all([
                    page.click('button[type="submit"]'),
                    page.waitForNavigation({ waitUntil: 'networkidle2' })
                ]);
                console.log(`Clicked login button and waited for navigation for ${site.base}`);

                await new Promise(res => setTimeout(res, 20000));
                console.log(`Waited for 20 seconds for ${site.base}`);

                await page.click('button.btn-continue');
                console.log(`Clicked continue button for ${site.base}`);
                await new Promise(res => setTimeout(res, 2000));
            } else {
                console.log(`Email and password fields not found for ${site.base}, skipping login step`);
            }

            await Promise.all([
                page.goto(`${site.base}${site.publish}`),
                page.waitForNavigation({ waitUntil: 'networkidle2' })
            ]);
            console.log(`Navigated to publish your ad page for ${site.base}`);

            await page.waitForSelector('#select_1');
            console.log(`Page loaded properly for ${site.base}`);

            await page.select('#select_1', '5');
            console.log(`Selected Services from the first dropdown for ${site.base}`);
            await new Promise(res => setTimeout(res, 2000));

            await page.waitForSelector('#select_2');
            await page.select('#select_2', formData.subCategory);
            console.log(`Selected ${formData.subCategory} from the second dropdown for ${site.base}`);
            await new Promise(res => setTimeout(res, 2000));

            await page.waitForSelector('#titleen_US');
            await page.click('#titleen_US');
            await page.type('#titleen_US', formData.title);
            console.log(`Filled in title for ${site.base}`);
            await new Promise(res => setTimeout(res, 2000));

            // Fill in the description inside the iframe
            await page.evaluate((description) => {
                const iframeBody = document.querySelector("#descriptionen_US_ifr").contentDocument.body;
                iframeBody.innerHTML = `<p>${description}</p>`;
            }, formData.description);
            console.log(`Filled in description for ${site.base}`);
            await new Promise(res => setTimeout(res, 2000)); // Wait for 2 seconds

            const filePath = 'C:\\Users\\Anshu\\Desktop\\nvd\\CL.jpg';
            const inputUploadHandle = await page.$('input[type=file]');
            await inputUploadHandle.uploadFile(filePath);
            console.log(`Uploaded image for ${site.base}`);
            await new Promise(res => setTimeout(res, 2000));

            await page.waitForSelector('#countryId');
            await page.select('#countryId', formData.country);
            console.log(`Selected ${formData.country} from the dropdown for ${site.base}`);
            await new Promise(res => setTimeout(res, 2000));

            await page.waitForSelector('#cityArea');
            await page.type('#cityArea', formData.cityArea);
            console.log(`Filled in city area for ${site.base}`);
            await new Promise(res => setTimeout(res, 2000));

            await page.waitForSelector('#address');
            await page.type('#address', formData.address);
            console.log(`Filled in address for ${site.base}`);
            await new Promise(res => setTimeout(res, 2000));

            await page.waitForSelector('#meta_website-link');
            await page.type('#meta_website-link', formData.websiteLink);
            console.log(`Added website link for ${site.base}`);
            await new Promise(res => setTimeout(res, 2000));

            await page.waitForSelector('#meta_keywords');
            await page.type('#meta_keywords', formData.keywords);
            console.log(`Added keywords for ${site.base}`);
            await new Promise(res => setTimeout(res, 2000));

            await page.waitForSelector('#meta_phone');
            await page.type('#meta_phone', formData.phone);
            console.log(`Added phone number for ${site.base}`);
            await new Promise(res => setTimeout(res, 2000));

            await page.click('input[type="radio"][name="productType"][value="001"]');
            console.log(`Selected product type for ${site.base}`);
            await new Promise(res => setTimeout(res, 2000));

            await page.evaluate(() => {
                const buttons = Array.from(document.querySelectorAll('button'));
                const button = buttons.find(btn => btn.textContent.trim() === 'Publish');
                if (button) {
                    button.click();
                }
            });

        } catch (error) {
            console.error(`Error for ${site.base}:`, error);
        } finally {
            console.log(`Script completed for ${site.base}`);
        }
    }

    console.log('All scripts completed. Browser will remain open.');
}

module.exports = runPuppeteerScript;
