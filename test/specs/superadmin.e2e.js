const SuperAdminPage = require('../pageobjects/superadmin.page');

describe('My Login application', () => {
  beforeAll('Navigation to URL', () => {
    browser.url('https://ayom-a-trackgenix-app.vercel.app/home');
  });
  it('should login superadmin', async () => {
    await expect(SuperAdminPage.titleHome).toBeDisplayed();
    await SuperAdminPage.btnLogin.click();
    await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/auth/login');
    await expect(SuperAdminPage.titleHome).toBeDisplayed();
    await expect(SuperAdminPage.loginForm).toBeDisplayed();
    await SuperAdminPage.login('albertojuju@leone.com', 'hola1234');
    await SuperAdminPage.btnConfirmLogin.click();
    await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/super-admins');
    await SuperAdminPage.aside.waitForDisplayed();
    await expect(SuperAdminPage.tableAdmins).toBeDisplayed();
    await expect(SuperAdminPage.tableBody).toBeDisplayed();
    await SuperAdminPage.btnCreateAdmins.click();
    await SuperAdminPage.create('juan carlos', 'azcuenaga', 'juanchisto@azcu.com', 'prueba1234');
    await SuperAdminPage.btnConfirmCreateAdmin.click();
    await expect(SuperAdminPage.modalConfirmCreateAdmin).toBeDisplayed();
    await SuperAdminPage.btnConfirmModal.click();
    await expect(SuperAdminPage.modalSuccess).toBeDisplayed();
    await expect(SuperAdminPage.modalSuccessText).toHaveText('Admins Successfully CREATED');
    await SuperAdminPage.btnCloseModal.click();
    await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/super-admins');
    await expect(SuperAdminPage.lastRowAdminCreated).toBeDisplayed();
    await SuperAdminPage.btnEditAdmin.click();
    await expect(browser).toHaveUrlContaining(
      'https://ayom-a-trackgenix-app.vercel.app/super-admins/admins/'
    );
    await expect(SuperAdminPage.titleEditPage).toBeDisplayed();
    await expect(SuperAdminPage.editPageForm).toBeDisplayed();
    await SuperAdminPage.editAdmin('fernando', 'azcoria', 'ferchasi@azcoria.com');
    await SuperAdminPage.btnConfirmEditAdmin.click();
    await expect(SuperAdminPage.modalConfirmCreateAdmin).toBeDisplayed();
    await SuperAdminPage.btnConfirmModal.click();
    await expect(SuperAdminPage.modalSuccess).toBeDisplayed();
    await expect(SuperAdminPage.modalSuccessText).toHaveText('Admins Successfully UPDATED');
    await SuperAdminPage.btnCloseModal.click();
    await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/super-admins');
    await expect(SuperAdminPage.aside).toBeDisplayed();
    await expect(SuperAdminPage.tableAdmins).toBeDisplayed();
    await expect(SuperAdminPage.tableBody).toBeDisplayed();
    await expect(SuperAdminPage.lastRowAdminCreated).toBeDisplayed();
    await SuperAdminPage.btnDeleteAdmin.click();
    await expect(SuperAdminPage.modalConfirmCreateAdmin).toBeDisplayed();
    await SuperAdminPage.btnConfirmModal.click();
    await expect(SuperAdminPage.modalSuccess).toBeDisplayed();
    await expect(SuperAdminPage.modalSuccessText).toHaveText('Account Successfully DELETED');
    await SuperAdminPage.btnCloseModal.click();
    await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/super-admins');
  });

  it('should be able to change profile data', async () => {
    await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/super-admins');
    await expect(SuperAdminPage.titleHome).toBeDisplayed();
    await expect(SuperAdminPage.aside).toBeDisplayed();
    await SuperAdminPage.btnProfilePage.click();
    await expect(browser).toHaveUrl(
      'https://ayom-a-trackgenix-app.vercel.app/super-admins/profile'
    );
    await expect(SuperAdminPage.titleHome).toBeDisplayed();
    await expect(SuperAdminPage.loginForm).toBeDisplayed();
    await expect(SuperAdminPage.profileTitlePage).toBeDisplayed();
    await expect(SuperAdminPage.profileImg).toBeDisplayed();
    await SuperAdminPage.editProfile('Alberto Juan', 'Corleone', 'albertojujuy@leone.com');
    await SuperAdminPage.btnprofileChangePasswordAdmin.click();
    await expect(SuperAdminPage.modalChangePassword).toBeDisplayed();
    await SuperAdminPage.changePassword('hola1234', 'hola1234');
    await SuperAdminPage.btnConfirmChangePassword.click();
    await expect(SuperAdminPage.modalConfirmCreateAdmin).toBeDisplayed();
    await SuperAdminPage.btnConfirmModal.click();
    await expect(SuperAdminPage.modalSuccess).toBeDisplayed();
    await expect(SuperAdminPage.modalSuccessText).toHaveText('SuperAdmin Successfully UPDATED');
    await SuperAdminPage.btnCloseModal.click();
    await SuperAdminPage.btnprofileSaveChanges.click();
    await expect(SuperAdminPage.modalConfirmCreateAdmin).toBeDisplayed();
    await SuperAdminPage.btnConfirmModal.click();
    await expect(SuperAdminPage.modalSuccess).toBeDisplayed();
    await expect(SuperAdminPage.modalSuccessText).toHaveText('SuperAdmin Successfully UPDATED');
    await SuperAdminPage.btnCloseModal.click();
    await expect(browser).toHaveUrl(
      'https://ayom-a-trackgenix-app.vercel.app/super-admins/profile'
    );
    await SuperAdminPage.btnMainPage.click();
    await expect(browser).toHaveUrlContaining(
      'https://ayom-a-trackgenix-app.vercel.app/super-admins'
    );
    await SuperAdminPage.aside.waitForDisplayed();
    await expect(SuperAdminPage.tableAdmins).toBeDisplayed();
    await SuperAdminPage.btnLogout.click();
    await expect(SuperAdminPage.modalConfirmCreateAdmin).toBeDisplayed();
    await SuperAdminPage.btnConfirmModal.click();
    await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/home');
  });
});
