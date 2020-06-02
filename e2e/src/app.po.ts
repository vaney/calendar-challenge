import {browser, by, element, ElementArrayFinder} from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getCalendar(): ElementArrayFinder {
    return element.all(by.css('app-calendar')) as ElementArrayFinder;
  }
}
