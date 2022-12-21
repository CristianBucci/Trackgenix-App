const EmployeePage = require('../pageobjects/signup.page');

describe('My Login application', () => {
    beforeAll('Navigation to URL', () => {
        browser.url('https://ayom-a-trackgenix-app.vercel.app/home');
    })
    it('should signup employee', async () => {
        await expect(EmployeePage.titleHome).toBeDisplayed();
        await EmployeePage.btnSignUp.click();
        await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/auth/sign-up');
        await expect(EmployeePage.titleHome).toBeDisplayed();
        await EmployeePage.create('pedro' , 'picapiedra', 'pedrito@pica.com', 'pedro1234', 'pedro1234', '3412345678');
        await EmployeePage.btnConfirmSignUp.click();
        browser.pause(10000);
        await EmployeePage.modalConsultConfirmCreateEmployee.waitForDisplayed();
        await EmployeePage.btnModalConfirmCreateEmployee.click();
        await expect(EmployeePage.modalConsultConfirmCreateEmployee).toBeDisplayed();
        await expect(EmployeePage.modalConfirmCreateEmployeeText).toHaveText('Employee Successfully CREATED');
        await EmployeePage.btnCloseModalConfirmCreateEmployee.click();
        await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/home');
    });

    it('should login employee', async () => {
        await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/home');
        await expect(EmployeePage.titleHome).toBeDisplayed();
        await EmployeePage.btnLogin.click();
        await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/auth/login');
        await expect(EmployeePage.titleHome).toBeDisplayed();
        await EmployeePage.login('pedrito@pica.com','pedro1234');
        await EmployeePage.btnConfirmLogin.click();
        await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/employees');
        await EmployeePage.sidebarEmployee.waitForDisplayed();
        await expect(EmployeePage.tableProyectEmployee).toBeDisplayed();
        // await expect(EmployeePage.tableProyectEmployee).toContain(EmployeePage.tableProyectEmployeeItem1);
    });

    it('should be able to add data in the projects you are', async () => {
        await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/employees');
        await expect(EmployeePage.titleHome).toBeDisplayed();
        await expect(EmployeePage.sidebarEmployee).toBeDisplayed();
        await expect(EmployeePage.tableProyectEmployee).toBeDisplayed();
        await expect(EmployeePage.tableProyectEmployeeData).toBeDisplayed();
        await EmployeePage.tableBtnAddHours.click();
        await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/employees/');
        await EmployeePage.tableBtnAddHours.click();
        await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/employees/timesheets/63a328a6f1498c1c4f6c977b');
        await EmployeePage.tableTimesheet.waitForDisplayed();
        await EmployeePage.tableTimesheetTitle.waitForDisplayed();
        await EmployeePage.add('project changes','18/12/2022', '8');
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
        await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/employees/');
        await expect(EmployeePage.titleHome).toBeDisplayed();
    });

    it('should be able to change profile data', async () => {
        await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/employees');
        await expect(EmployeePage.titleHome).toBeDisplayed();
        await expect(EmployeePage.sidebarEmployee).toBeDisplayed();
        await expect(EmployeePage.tableProyectEmployee).toBeDisplayed();
        await expect(EmployeePage.sidebarUl).toBeDisplayed();
        await expect(EmployeePage.sidebarProfile).toBeDisplayed();
        await EmployeePage.btnSidebarProfile.click();
        await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/employees/profile');
        await expect(EmployeePage.profileForm).toBeDisplayed();
        await expect(EmployeePage.profileImage).toBeDisplayed();
        await EmployeePage.editProfile('Juan pedro','picapiedra buena','juanpedro@picabu.com','3514567980');
        await EmployeePage.btnChangePasswordAccountEmployee.click();
        await expect(EmployeePage.modalModifyPassword).toBeDisplayed();
        await EmployeePage.changePassword('prueba1234','prueba1234');
        await EmployeePage.btnConfirmChangePassword.click();
        await expect(EmployeePage.modalConfirmAddDataEmployee).toBeDisplayed();
        await EmployeePage.btnmodalConfirmAddDataEmployee.click();
        await expect(EmployeePage.modalConfirmCreteTimesheet).toBeDisplayed();
        await expect(EmployeePage.modalConfirmCreateEmployeeText).toHaveText('Employee Successfully UPDATED');
        await EmployeePage.btnCloseModalConfirmCreateEmployee.click();
        await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/employees/profile');
        await EmployeePage.btnSaveChanges.click();
        await expect(EmployeePage.modalConfirmAddDataEmployee).toBeDisplayed();
        await EmployeePage.btnmodalConfirmAddDataEmployee.click();
        await expect(EmployeePage.modalConfirmCreteTimesheet).toBeDisplayed();
        await expect(EmployeePage.modalConfirmCreateEmployeeText).toHaveText('Employee Successfully UPDATED');
        await EmployeePage.btnCloseModalConfirmCreateEmployee.click();
        await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/employees/profile');
        await EmployeePage.btnMainPage.click();
        await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/employees/');
        await EmployeePage.btnLogout.click();
        await expect(EmployeePage.modalConfirmLogout).toBeDisplayed();
        await EmployeePage.btnConfirmLogout.click();
        await expect(browser).toHaveUrl('https://ayom-a-trackgenix-app.vercel.app/home');
    });
});
