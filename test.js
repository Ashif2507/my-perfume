import puppeteer from 'puppeteer';

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    page.on('requestfailed', request => {
      console.log('REQUEST FAILED:', request.url(), request.failure().errorText);
    });

    console.log('Navigating to http://localhost:5173/admin/products ...');
    await page.goto('http://localhost:5173/admin/products');
    await new Promise(r => setTimeout(r, 2000));
    
    console.log('Navigating to http://localhost:5173/admin/customers ...');
    await page.goto('http://localhost:5173/admin/customers');
    await new Promise(r => setTimeout(r, 2000));

    console.log('Navigating to http://localhost:5173/admin/orders ...');
    await page.goto('http://localhost:5173/admin/orders');
    await new Promise(r => setTimeout(r, 2000));

    await browser.close();
    console.log('Test complete.');
  } catch (err) {
    console.error('TEST SCRIPT ERROR:', err);
  }
})();
