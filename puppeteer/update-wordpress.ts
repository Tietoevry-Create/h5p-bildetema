import puppeteer from "puppeteer";
import fs from "fs"

const { log } = console;

async function openPage(page: puppeteer.Page, url: string) {
  log("Open-page")
  await page.goto(`${url}`, {
    waitUntil: "networkidle2",
  });
}

async function logInIfNotAuthenticated(page: puppeteer.Page): Promise<void> {
  log("Loggin")
  const user = process.env.WORDPRESS_USER
  ? process.env.WORDPRESS_USER
  : "admin";
  const password = process.env.WORDPRESS_PASSWORD
  ? process.env.WORDPRESS_PASSWORD
  : "admin";
  const isLoggedIn = !(await page.evaluate(
    () => !!document.querySelector("#user_login"),
    ));

  if (!isLoggedIn) {
    await page.type("#user_login", user);
      await page.type("#user_pass", password);
      await page.click("#wp-submit");
  }
}

async function updateLibrary(page: puppeteer.Page, filePath: string): Promise<void> {
  log("Upload")
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click("#h5p-file"),
  ]);
  await fileChooser.accept([filePath]);
  await page.click("[name=submit]")
}


(async () => {
  const url = process.env.WORDPRESS_URL
    ? process.env.WORDPRESS_URL
    : "http://localhost:8080/wp-admin/";
  const libUrl = `${url}admin.php?page=h5p_libraries`
  const h5pFilePath = "./all.h5p"

  if (!fs.existsSync(h5pFilePath)) return
  log("file exist")
  // debug settings:
  // const browser = await puppeteer.launch({
  //   dumpio: true,
  //   headless: false,
  //   devtools: true,
  // });
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await openPage(page, url)
  await logInIfNotAuthenticated(page);
  await openPage(page, libUrl)
  await updateLibrary(page, h5pFilePath)

  await browser.close();
})();