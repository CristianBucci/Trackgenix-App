const EmployeePage = require('../pageobjects/employee.page');

describe('My Login application', () => {
  beforeAll('Navigation to URL', () => {
    browser.url('https://ayom-a-trackgenix-app.vercel.app/home');
  });
  it('should signup employee', async () => {
    await expect(EmployeePage.titleHome).toBeDisplayed();
    await EmployeePage.btnSignUp.click();
    await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/auth/sign-up');
    await expect(EmployeePage.titleHome).toBeDisplayed();
    await EmployeePage.create(
      'pedro',
      'pellerano',
      'pedrito100@pelle.com',
      3412345678,
      'pedro1234',
      'pedro1234'
    );
    await EmployeePage.btnConfirmSignUp.click();
    await EmployeePage.modalConsultConfirmCreateEmployee.waitForDisplayed();
    await EmployeePage.btnModalConfirmCreateEmployee.click();
    await expect(EmployeePage.modalConfirmCreateEmployee).toBeDisplayed();
    await EmployeePage.btnCloseModalConfirmCreateEmployee.click();
    await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/home');
  });

  it('should login employee with no assigned projects', async () => {
    await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/home');
    await expect(EmployeePage.titleHome).toBeDisplayed();
    await EmployeePage.btnLogin.click();
    await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/auth/login');
    await expect(EmployeePage.titleHome).toBeDisplayed();
    await EmployeePage.login('pedrito100@pelle.com', 'pedro1234');
    await EmployeePage.btnConfirmLogin.click();
    await expect(browser).toHaveUrlContaining('https://ayom-a-trackgenix-app.vercel.app/employees');
    await EmployeePage.sidebarEmployee.waitForDisplayed();
    await EmployeePage.btnLogout.click();
    await expect(EmployeePage.modalConfirmLogout).toBeDisplayed();
    await EmployeePage.btnConfirmLogout.click();
    await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/home');
  });

  it('should login employee with add projects', async () => {
    await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/home');
    await expect(EmployeePage.titleHome).toBeDisplayed();
    await EmployeePage.btnLogin.click();
    await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/auth/login');
    await expect(EmployeePage.titleHome).toBeDisplayed();
    await EmployeePage.login('juanpedro@gonza.com', 'hola1234');
    await EmployeePage.btnConfirmLogin.click();
    await expect(browser).toHaveUrlContaining('https://ayom-a-trackgenix-app.vercel.app/employees');
    await EmployeePage.sidebarEmployee.waitForDisplayed();
    await expect(EmployeePage.tableProyectEmployee).toBeDisplayed();
  });

  it('should be able to add data in the projects you are', async () => {
    await expect(browser).toHaveUrlContaining('https://ayom-a-trackgenix-app.vercel.app/employees');
    await expect(EmployeePage.titleHome).toBeDisplayed();
    await expect(EmployeePage.sidebarEmployee).toBeDisplayed();
    await expect(EmployeePage.tableProyectEmployee).toBeDisplayed();
    await expect(EmployeePage.tableProyectEmployeeData).toBeDisplayed();
    await EmployeePage.tableBtnAddHours.click();
    await expect(browser).toHaveUrlContaining('https://ayom-a-trackgenix-app.vercel.app/employees');
    await EmployeePage.tableBtnAddHours.click();
    await expect(browser).toHaveUrlContaining(
      'https://ayom-a-trackgenix-app.vercel.app/employees/timesheets/'
    );
    await EmployeePage.tableTimesheet.waitForDisplayed();
    await EmployeePage.tableTimesheetTitle.waitForDisplayed();
    await EmployeePage.add('project changes', '18/12/2022', '8');
    await EmployeePage.btnSelectTaskEmployee.click();
    await expect(EmployeePage.btnSelectTaskOptionBEEmployee).toBeDisplayed();
    await expect(EmployeePage.btnSelectTaskOptionFEEmployee).toBeDisplayed();
    await EmployeePage.btnSelectTaskOptionBEEmployee.click();
    await EmployeePage.btnSelectProjectEmployee.click();
    await EmployeePage.btnSelectProjectOptionEmployee.click();
    await EmployeePage.btnConfirmAddDataEmployee.click();
    await expect(EmployeePage.modalConfirmAddDataEmployee).toBeDisplayed();
    await EmployeePage.btnmodalConfirmAddDataEmployee.click();
    await expect(EmployeePage.modalConfirmCreteTimesheet).toBeDisplayed();
    await EmployeePage.btnClosemodalConfirmCreteTimesheet.click();
    await expect(browser).toHaveUrlContaining('https://ayom-a-trackgenix-app.vercel.app/employees');
    await expect(EmployeePage.titleHome).toBeDisplayed();
  });

  it('should be able to change profile data', async () => {
    await expect(browser).toHaveUrlContaining('https://ayom-a-trackgenix-app.vercel.app/employees');
    await expect(EmployeePage.titleHome).toBeDisplayed();
    await expect(EmployeePage.sidebarEmployee).toBeDisplayed();
    await expect(EmployeePage.tableProyectEmployee).toBeDisplayed();
    await expect(EmployeePage.sidebarUl).toBeDisplayed();
    await expect(EmployeePage.sidebarProfile).toBeDisplayed();
    await EmployeePage.btnSidebarProfile.click();
    await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/employees/profile');
    await expect(EmployeePage.profileForm).toBeDisplayed();
    await expect(EmployeePage.profileImage).toBeDisplayed();
    await EmployeePage.editProfile('Juan pedro', 'gonzalez', 'juanpedro5@gonza.com', '3514567980');
    await EmployeePage.btnChangePasswordAccountEmployee.click();
    await expect(EmployeePage.modalModifyPassword).toBeDisplayed();
    await EmployeePage.changePassword('hola1234', 'hola1234');
    await EmployeePage.btnConfirmChangePassword.click();
    await expect(EmployeePage.modalConfirmAddDataEmployee).toBeDisplayed();
    await EmployeePage.btnmodalConfirmAddDataEmployee.click();
    await expect(EmployeePage.modalConfirmCreteTimesheet).toBeDisplayed();
    await EmployeePage.btnCloseModalConfirmCreateEmployee.click();
    await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/employees/profile');
    await EmployeePage.btnSaveChanges.click();
    await expect(EmployeePage.modalConfirmAddDataEmployee).toBeDisplayed();
    await EmployeePage.btnmodalConfirmAddDataEmployee.click();
    await expect(EmployeePage.modalConfirmCreteTimesheet).toBeDisplayed();
    await EmployeePage.btnCloseModalConfirmCreateEmployee.click();
    await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/employees/profile');
    await EmployeePage.btnMainPage.click();
    await expect(browser).toHaveUrlContaining('https://ayom-a-trackgenix-app.vercel.app/employees');
    await EmployeePage.btnLogout.click();
    await expect(EmployeePage.modalConfirmLogout).toBeDisplayed();
    await EmployeePage.btnConfirmLogout.click();
    await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/home');
  });
});
