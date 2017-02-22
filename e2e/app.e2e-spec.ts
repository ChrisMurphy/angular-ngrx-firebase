import { AngularNgrxFirebasePage } from './app.po';

describe('angular-ngrx-firebase App', () => {
  let page: AngularNgrxFirebasePage;

  beforeEach(() => {
    page = new AngularNgrxFirebasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
