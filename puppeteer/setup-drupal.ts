import puppeteer from "puppeteer";

const { log } = console;

async function openPage(page: puppeteer.Page) {
  const url = process.env.DRUPAL_URL
    ? process.env.DRUPAL_URL
    : "http://localhost:8080/";

  await page.goto(`${url}`, {
    waitUntil: "networkidle2",
  });
}

async function logInIfNotAuthenticated(page: puppeteer.Page): Promise<void> {
  const isLoggedIn = !(await page.evaluate(
    () => !!document.querySelector("#edit-name"),
  ));

  if (!isLoggedIn) {
    await page.type("#edit-name", "admin");
    await page.type("#edit-pass", "admin");
    await page.click("#edit-submit");
  }
}

async function openH5PAdminTool(page: puppeteer.Page): Promise<void> {
  await page.waitForSelector("a[href='/node/add']");
  await page.goto(`http://localhost:8080/node#overlay=node/add/h5p-content`, {
    waitUntil: "networkidle2",
  });

  await page.waitForTimeout(5000);
}

async function getEditorIframe(page: puppeteer.Page): Promise<puppeteer.Frame> {
  return page.mainFrame().childFrames()[1];
}

async function openH5PContentTypeEditor(
  page: puppeteer.Page,
  contentType: string,
  editorIframe: puppeteer.Frame,
): Promise<void> {
  await page.waitForTimeout(5000);
  await editorIframe.childFrames()[0].click(`#${contentType}`);
  await page.waitForTimeout(5000);
}

async function saveH5PContentType(
  page: puppeteer.Page,
  editorIframe: puppeteer.Frame,
): Promise<void> {
  await editorIframe.click("#edit-submit");
  await page.waitForTimeout(5000);
}

async function startEditingH5PContentType(
  page: puppeteer.Page,
  contentType: string,
): Promise<puppeteer.Frame> {
  await openPage(page);
  await logInIfNotAuthenticated(page);

  await openH5PAdminTool(page);

  const h5pEditorIframe = await getEditorIframe(page);

  await openH5PContentTypeEditor(page, contentType, h5pEditorIframe);

  return h5pEditorIframe;
}

async function createBildetemaInstance(
  title: string,
  page: puppeteer.Page,
): Promise<void> {
  const h5pEditorIframe = await startEditingH5PContentType(
    page,
    "h5p-bildetema",
  );

  log("Set title to", title);
  await h5pEditorIframe.childFrames()[0].type("#field-extratitle--1", title);

  await saveH5PContentType(page, h5pEditorIframe);
}

async function createTopicImageInstance(
  title: string,
  page: puppeteer.Page,
  topicId: string,
  subtopicId?: string,
) {
  const h5pEditorIframe = await startEditingH5PContentType(
    page,
    "h5p-bildetematopicimageview",
  );

  const editorFrame = h5pEditorIframe.childFrames()[0];

  log("Set title to", title);
  await editorFrame.type("#field-extratitle--1", title);

  log("Open file chooser");
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    editorFrame.click(".file a"),
  ]);

  log("Upload file");
  await fileChooser.accept(["./puppeteer/jellyfish-1.jpeg"]);
  await page.waitForTimeout(5000);

  log("Set topic");
  await editorFrame.select("[data-test-id=topic-select]", topicId);

  log("Set subtopic");
  if (subtopicId) {
    await editorFrame.select("[data-test-id=subtopic-select]", subtopicId);
  }

  const topicImageEditor = await editorFrame.$("[data-test-id=editor]");
  if (!topicImageEditor) {
    throw new Error("Could not find `[data-test-id=editor]`");
  }

  log("Pick word");
  const firstWordButton = await topicImageEditor.$("button");
  await firstWordButton?.click();

  log("Find SVG");
  const svg = await topicImageEditor.$("svg");
  if (!svg) {
    throw new Error("Can't find SVG");
  }

  log("Get size of SVG");
  const svgBcr = await svg.boundingBox();
  if (!svgBcr) {
    throw new Error("Could not find svg bcr");
  }

  const { x, y, width, height } = svgBcr;

  log("Construct rectangle");
  const topLeft = {
    x: x + (1 * width) / 4,
    y: y + (1 * height) / 4,
  };

  const bottomRight = {
    x: x + (3 * width) / 4,
    y: y + (3 * height) / 4,
  };

  log("Draw rectangle");
  await page.mouse.click(topLeft.x, topLeft.y);
  await page.mouse.click(bottomRight.x, topLeft.y);
  await page.mouse.click(topLeft.x, bottomRight.y);
  await page.mouse.click(bottomRight.x, bottomRight.y);

  log("Finish drawing figure");
  await page.mouse.click(topLeft.x, topLeft.y);

  await saveH5PContentType(page, h5pEditorIframe);
}

(async () => {
  const title = process.env.TITLE ? process.env.TITLE : "some title";

  // debug settings:
  // const browser = await puppeteer.launch({
  //   dumpio: true,
  //   headless: false,
  //   devtools: true,
  // });
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await createBildetemaInstance(title, page);
  await createTopicImageInstance("Dyr i vann", page, "T001", "T003");

  await browser.close();
})();
