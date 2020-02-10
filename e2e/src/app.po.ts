import { browser, by, element, ElementFinder } from "protractor";

export class AppPage {
  async navigateTo() {
    return (await browser.get(browser.baseUrl)) as Promise<any>;
  }

  getTitleText() {
    return element(by.css(".title")).getText() as Promise<
      string
    >;
  }

  getOnlyCreatedByMeLabel(): ElementFinder {
    return element(by.css(".my-articles-toggle label"));
  }

  getSelectNewsSourceBtn(): ElementFinder {
    return element(by.css(".source-dropdown .dropbtn"));
  }

  getChooseNewsSourceOption(): ElementFinder {
    return element.all(by.css(".dr-content .dr-item")).first();
  }

  getArticlesList(): ElementFinder {
    return element(by.css(".articles-list"));
  }
}