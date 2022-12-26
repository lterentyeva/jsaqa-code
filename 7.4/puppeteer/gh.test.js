let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.deleteCookie();
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForTimeout(1000);
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Let’s build from here · GitHub");
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  });

  test("Title of the page 'Actions' it's true", async () => {
    await page.hover(".HeaderMenu-link");
    await page.click("[href='/features/actions']");
    await page.waitForTimeout(1000);
    const title = await page.title();
    expect(title).toEqual("Features • GitHub Actions · GitHub");
  });

  test("Title of the page 'Packages' it's true", async () => {
    await page.hover(".HeaderMenu-link");
    await page.click("[href='/features/packages']");
    await page.waitForTimeout(1000);
    const title = await page.title();
    expect(title).toEqual(
      "GitHub Packages: Your packages, at home with their code · GitHub"
    );
  });

  test("Title of the page 'Codespaces' it's true", async () => {
    await page.hover(".HeaderMenu-link");
    await page.click("[href='/features/codespaces']");
    await page.waitForTimeout(1000);
    const title = await page.title();
    expect(title).toEqual("GitHub Codespaces · GitHub");
  });
});
