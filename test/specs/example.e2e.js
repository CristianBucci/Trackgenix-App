const AdminPage = require('../pageobjects/login.page');

describe('My Login application', () => {
    beforeAll('Navigation to URL', () => {
        browser.url('https://ayom-a-trackgenix-app.vercel.app/admins');
    })
    it('should create,edit and delete admins', async () => {
      await expect(AdminPage.titleAdmin).toBeDisplayed();
      await AdminPage.btnCreateAdmin.click();
      await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/admins/form');
      await expect(AdminPage.titleCreateAdmin).toBeDisplayed();
      await AdminPage.create('juan' , 'perez', 'juan@perez.com', 'juan1234');
      await AdminPage.btnConfirmCreateAdmin.click();
      await expect(AdminPage.modalConfirmCreateAdmin).toBeDisplayed();
      await AdminPage.btnModalConfirmCreateAdmin.click();
      await expect(AdminPage.modalCreateAdminSuccess).toBeDisplayed();
      await expect(AdminPage.modalCreateAdminSuccessText).toHaveText('Admins Successfully CREATED');
      await AdminPage.btnCloseModalCreateAdminSuccess.click();
      await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/admins');
      await expect(AdminPage.listAdmins).toBeDisplayed();
      await expect(AdminPage.nameAdminCreated).toHaveText('juan');
      await expect(AdminPage.lastNameAdminCreated).toHaveText('perez');
      await expect(AdminPage.emailAdminCreated).toHaveText('juan@perez.com');
    });
});
