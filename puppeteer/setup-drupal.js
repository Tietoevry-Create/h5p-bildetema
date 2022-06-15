const puppeteer = require("puppeteer");

(async () => {
  const url = process.env.DRUPAL_URL
    ? process.env.DRUPAL_URL
    : "http://localhost:8080/";
  const title = process.env.TITLE ? process.env.TITLE : "some title";

  // debug settings:
  // const browser = await puppeteer.launch({dumpio: true, headless: false, devtools: true});
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto(`${url}`, {
    waitUntil: "networkidle2",
  });

  await page.type("#edit-name", "admin");
  await page.type("#edit-pass", "admin");
  await page.click("#edit-submit");
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  await page.goto(`${url}/node#overlay=node/add/h5p-content`, {
    waitUntil: "networkidle2",
  });

  await page.waitForTimeout(1000);
  const h5pEditorIframe = await page
    .mainFrame()
    .childFrames()[1]
    .childFrames()[0];

  await h5pEditorIframe.click("#h5p-bildetema");
  await page.waitForTimeout(1000);

  const h5pBildetemaEditorIframe = await page
    .mainFrame()
    .childFrames()[1]
    .childFrames()[0];
  const editorIframe = await page.mainFrame().childFrames()[1];

  await h5pBildetemaEditorIframe.type("#field-extratitle--1", title);
  await editorIframe.click("#edit-submit");
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  await browser.close();
})();
