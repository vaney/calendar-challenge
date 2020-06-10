import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import generateRandomEvents from './utils';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display calendar', () => {
    page.navigateTo();
    const list = page.getCalendar();
    expect(list.count()).toEqual(1);
  });

  it('should render 100 random events', () => {
    page.navigateTo();
    const events = generateRandomEvents();

    browser.executeScript('return window.layOutDay(arguments[0])', events);

    const list = page.getEvents();
    expect(list.count()).toEqual(100);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
