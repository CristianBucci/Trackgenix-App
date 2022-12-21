class EmployeePage{

    get inputName() {
        return $('#root > div > div > form > div:nth-child(2) > div > input');
    }

    get inputLastName() {
        return $('#root > div > div > form > div:nth-child(3) > div > input');
    }
  
    get inputEmail() {
        return $('#root > div > div > form > div:nth-child(4) > div > input');
    }
  
    get inputPassword() {
        return $('#root > div > div > form > div:nth-child(5) > div > input');
    }

    get inputRepeatPassword() {
        return $('#root > div > div > form > div:nth-child(6) > div > input');
    }

    get inputPhone() {
        return $('#root > div > div > form > div:nth-child(7) > div > input');
    }

    get titleHome() {
        return $('#root > div > header > a > h2');
    }

    get btnSignUp() {
        return $('#root > div > header > div > a:nth-child(2) > button')
    }

    get btnConfirmSignUp() {
        return $('#root > div > div > form > div:nth-child(8) > button.button_primary__Z2ahL')
    }

    get modalConsultConfirmCreateEmployee() {
        return $('#root > div > div:nth-child(3) > div')
    }

    get btnModalConfirmCreateEmployee() {
        return $('#root > div > div:nth-child(3) > div > div > button.modalConfirm_modalBtn__Fd05H.modalConfirm_BtnConfirm__M5fZ6')
    }

    get modalConfirmCreateEmployee() {
        return $('#root > div > div.modalMessage_overlay__6NYRk > div')
    }

    get modalConfirmCreateEmployeeText() {
        return $('#root > div > div.modalMessage_overlay__6NYRk > div > div > span')
    } //#root > div > div.modalMessage_overlay__6NYRk > div > div

    get btnCloseModalConfirmCreateEmployee() {
        return $('#root > div > div.modalMessage_overlay__6NYRk > div > span > button')
    }

    get btnLogin() {
        return $('#root > div > header > div > a.header_link__euOgH > button')
    }

    get inputAccessEmail() {
        return $('#root > div > div > form > div.input_inputWrapper__JLXzU > div > input')
    }

    get inputAccessPassword() {
        return $('#root > div > div > form > div.login_inputPassword__lXbIp > div > div > div > input')
    }

    get btnConfirmLogin() {
        return $('#root > div > div > form > div:nth-child(4) > button')
    }

    get sidebarEmployee() {
        return $('#root > div > aside')
    }

    get tableProyectEmployee() {
        return $('#root > div > div > div > table')
    }

    get tableProyectEmployeeItem1() {
        return $('#root > div > div > div > table > thead > tr > th:nth-child(1)')
    }

    get tableProyectEmployeeData() {
        return $('#root > div > div > div > table > tbody')
    }

    get tableBtnAddHours() {
        return $('#root > div > div > div > table > tbody > tr > td:nth-child(7) > div > a')
    }

    get tableTimesheet() {
        return $('#root > div > div > form > div')
    }

    get tableTimesheetTitle() {
        return $('#root > div > div > form > div > div.timeSheet_cardTitle__6xs52')
    }

    get inputAddDataDescriptionEmployee() {
        return $('#root > div > div > form > div > div:nth-child(2) > div > input')
    }

    get inputAddDataDateEmployee() {
        return $('#root > div > div > form > div > div:nth-child(3) > div > input')
    }

    get inputAddDataHoursEmployee() {
        return $('#root > div > div > form > div > div:nth-child(4) > div > input')
    }

    get btnSelectTaskEmployee() {
        return $('#root > div > div > form > div > div:nth-child(5) > div > select')
    }

    get btnSelectTaskOptionBEEmployee() {
        return $('#root > div > div > form > div > div:nth-child(5) > div > select > option:nth-child(2)')
    }

    get btnSelectTaskOptionFEEmployee() {
        return $('#root > div > div > form > div > div:nth-child(5) > div > select > option:nth-child(3)')
    }


    get btnSelectProjectEmployee() {
        return $('#root > div > div > form > div > div:nth-child(6) > div > select')
    }

    get btnSelectProjectOptionEmployee() {
        return $('#root > div > div > form > div > div:nth-child(6) > div > select > option:nth-child(2)')
    }

    get btnConfirmAddDataEmployee() {
        return $('#root > div > div > form > div > div.timeSheet_cardButton__pJNNA > button.button_primary__Z2ahL')
    }

    get modalConfirmAddDataEmployee() {
        return $('#root > div > div:nth-child(4) > div')
    }

    get btnmodalConfirmAddDataEmployee() {
        return $('#root > div > div:nth-child(4) > div > div > button.modalConfirm_modalBtn__Fd05H.modalConfirm_BtnConfirm__M5fZ6')
    }

    get modalConfirmCreteTimesheet() {
        return $('#root > div > div.modalMessage_overlay__6NYRk > div')
    }

    get btnClosemodalConfirmCreteTimesheet() {
        return $('#root > div > div.modalMessage_overlay__6NYRk > div > span > button')
    }

    get sidebarUl() {
        return $('#root > div > aside > ul')
    }

    get sidebarProfile() {
        return $('#root > div > aside > ul > li:nth-child(3)')
    }

    get btnSidebarProfile() {
        return $('#root > div > aside > ul > li:nth-child(3) > a')
    }

    get profileForm() {
        return $('#root > div > div > form')
    }

    get profileImage() {
        return $('#root > div > div > form > img')
    }

    get profileInputName() {
        return $('#root > div > div > form > div:nth-child(3) > div > input');
    }

    get profileInputLastName() {
        return $('#root > div > div > form > div:nth-child(4) > div > input');
    }

    get profileInputEmail() {
        return $('#root > div > div > form > div:nth-child(5) > div > input');
    }

    get profileInputPhone() {
        return $('#root > div > div > form > div:nth-child(6) > div > input');
    }

    get btnChangePasswordAccountEmployee() {
        return $('#root > div > div > form > div:nth-child(7) > button');
    }

    get modalModifyPassword() {
        return $('#root > div > div.modalPassword_overlay__dDv1- > div');
    }

    get inputChangePassword() {
        return $('#root > div > div.modalPassword_overlay__dDv1- > div > form > div:nth-child(1) > div > input');
    }

    get inputChangeRepeatPassword() {
        return $('#root > div > div.modalPassword_overlay__dDv1- > div > form > div:nth-child(2) > div > input');
    }

    get btnConfirmChangePassword() {
        return $('#root > div > div.modalPassword_overlay__dDv1- > div > div > button.button_primary__Z2ahL');
    }

    get btnSaveChanges() {
        return $('#root > div > div > form > div:nth-child(8) > button');
    }

    get btnMainPage() {
        return $('#root > div > aside > ul > li:nth-child(1) > a');
    }

    get btnLogout() {
        return $('#root > div > header > div > button');
    }

    get modalConfirmLogout() {
        return $('#root > div > div.modalConfirm_modalContainer__UrTfo > div');
    }

    get btnConfirmLogout() {
        return $('#root > div > div.modalConfirm_modalContainer__UrTfo > div > div > button.modalConfirm_modalBtn__Fd05H.modalConfirm_BtnConfirm__M5fZ6');
    }
    async create(name, lastName, email, password, repeatPassword, phone) {
        await this.inputName.setValue(name);
        await this.inputLastName.setValue(lastName);
        await this.inputEmail.setValue(email)
        await this.inputPassword.setValue(password);
        await this.inputRepeatPassword.setValue(repeatPassword);
        await this.inputPhone.setValue(phone);
    }
    async login(email, password) {
        await this.inputAccessEmail.setValue(email);
        await this.inputAccessPassword.setValue(password);
    }
    async add(description, date, hours) {
        await this.inputAddDataDescriptionEmployee.setValue(description);
        await this.inputAddDataDateEmployee.setValue(date);
        await this.inputAddDataHoursEmployee.setValue(hours);
    }
    async editProfile(name, lastName, email, phone) {
        await this.profileInputName.setValue(name);
        await this.profileInputLastName.setValue(lastName);
        await this.profileInputEmail.setValue(email);
        await this.profileInputPhone.setValue(phone);
    }
    async changePassword(password, repeatPassword) {
        await this.inputChangePassword.setValue(password);
        await this.inputChangeRepeatPassword.setValue(repeatPassword);
    }
}

module.exports = new EmployeePage();