import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const screenshotsDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\7055d743-4ee2-4a74-bd53-21e786933599\\scratch';

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    console.log('Navigating to http://localhost:4173 ...');
    // Using 4173 because we ran `npm run preview`
    await page.goto('http://localhost:4173');
    await new Promise(r => setTimeout(r, 2000));

    await page.setViewport({ width: 1440, height: 900 });
    
    // Find and click the search button
    const searchButton = await page.$('button[aria-label="Search"]');
    if (searchButton) {
      console.log('Clicking search button...');
      await searchButton.click();
      await new Promise(r => setTimeout(r, 1000)); // wait for transition
      
      const screenshotPath = path.join(screenshotsDir, `desktop-1440-search-active.png`);
      await page.screenshot({
        path: screenshotPath,
        clip: { x: 0, y: 0, width: 1440, height: 150 }
      });
      console.log(`Saved screenshot to ${screenshotPath}`);
    } else {
      console.log('Search button not found!');
    }

    await browser.close();
    console.log('Capture complete.');
  } catch (err) {
    console.error('ERROR CAPTURING SCREENSHOTS:', err);
  }
})();
