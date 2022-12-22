class SuperAdminPage {
  get inputEmail() {
    return $('#root > div > div > form > div.input_inputWrapper__JLXzU > div > input');
  }

  get inputPassword() {
    return $('#root > div > div > form > div:nth-child(3) > div > div > div > input');
  }

  get titleHome() {
    return $('#root > div > header > a > h2');
  }

  get titleHomePage() {
    return $('#root > div > main > section.home_container__+O+R5 > h2');
  }

  get btnLogin() {
    return $('#root > div > header > div > a.header_link__euOgH > button');
  }

  get loginForm() {
    return $('#root > div > div > form');
  }

  get btnConfirmLogin() {
    return $('#root > div > div > form > div:nth-child(4) > button');
  }

  get aside() {
    return $('#root > div > aside');
  }

  get searchInput() {
    return $('#root > div > div > div > div > div:nth-child(1)');
  }

  get tableAdmins() {
    return $('#root > div > div > div > table');
  }

  get tableBody() {
    return $('#root > div > div > div > table > tbody');
  }

  get btnCreateAdmins() {
    return $('#root > div > div > div > div > div:nth-child(2) > a > button');
  }

  get inputNameCreateAdmins() {
    return $('#root > div > div > form > div:nth-child(2) > div > input');
  }

  get inputLastNameCreateAdmins() {
    return $('#root > div > div > form > div:nth-child(3) > div > input');
  }

  get inputEmailCreateAdmins() {
    return $('#root > div > div > form > div:nth-child(4) > div > input');
  }

  get inputPasswordCreateAdmins() {
    return $('#root > div > div > form > div:nth-child(5) > div > input');
  }

  get btnConfirmCreateAdmin() {
    return $('#root > div > div > form > div:nth-child(6) > button.button_primary__Z2ahL');
  }

  get modalConfirmCreateAdmin() {
    return $('#root > div > div:nth-child(4) > div');
  }

  get btnConfirmModal() {
    return $(
      '#root > div > div:nth-child(4) > div > div > button.modalConfirm_modalBtn__Fd05H.modalConfirm_BtnConfirm__M5fZ6'
    );
  }

  get modalSuccess() {
    return $('#root > div > div.modalMessage_overlay__6NYRk > div');
  }

  get modalSuccessText() {
    return $('#root > div > div.modalMessage_overlay__6NYRk > div > div > span');
  }

  get btnCloseModal() {
    return $('#root > div > div.modalMessage_overlay__6NYRk > div > span > button');
  }

  get lastRowAdminCreated() {
    return $('#root > div > div > div > table > tbody > tr:nth-child(6)');
  }

  get btnEditAdmin() {
    return $(
      '#root > div > div > div > table > tbody > tr:nth-child(6) > td:nth-child(4) > div > a > button'
    );
  }

  get titleEditPage() {
    return $('#root > div > div > form > h2');
  }

  get editPageForm() {
    return $('#root > div > div > form');
  }

  get inputNameEditAdmins() {
    return $('#root > div > div > form > div:nth-child(2) > div > input');
  }

  get inputLastNameEditAdmins() {
    return $('#root > div > div > form > div:nth-child(3) > div > input');
  }

  get inputEmailEditAdmins() {
    return $('#root > div > div > form > div:nth-child(4) > div > input');
  }

  get btnConfirmEditAdmin() {
    return $('#root > div > div > form > div:nth-child(5) > button.button_primary__Z2ahL');
  }

  get btnDeleteAdmin() {
    return $(
      '#root > div > div > div > table > tbody > tr:nth-child(6) > td:nth-child(4) > div > button'
    );
  }

  get btnProfilePage() {
    return $('#root > div > aside > ul > li:nth-child(2) > a');
  }

  get profileTitlePage() {
    return $('#root > div > div > form > h2');
  }

  get profileImg() {
    return $('#root > div > div > form > img');
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

  get btnprofileChangePasswordAdmin() {
    return $('#root > div > div > form > div:nth-child(6) > button');
  }

  get btnprofileSaveChanges() {
    return $('#root > div > div > form > div:nth-child(7) > button');
  }

  get modalChangePassword() {
    return $('#root > div > div.modalPassword_overlay__dDv1- > div');
  }

  get inputChangePassword() {
    return $(
      '#root > div > div.modalPassword_overlay__dDv1- > div > form > div:nth-child(1) > div > input'
    );
  }

  get inputChangeRepeatPassword() {
    return $(
      '#root > div > div.modalPassword_overlay__dDv1- > div > form > div:nth-child(2) > div > input'
    );
  }

  get btnConfirmChangePassword() {
    return $(
      '#root > div > div.modalPassword_overlay__dDv1- > div > div > button.button_primary__Z2ahL'
    );
  }

  get btnMainPage() {
    return $('#root > div > aside > ul > li:nth-child(1) > a');
  }

  get btnLogout() {
    return $('#root > div > header > div > button');
  }
  async login(email, password) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
  }
  async create(name, lastName, email, password) {
    await this.inputNameCreateAdmins.setValue(name);
    await this.inputLastNameCreateAdmins.setValue(lastName);
    await this.inputEmailCreateAdmins.setValue(email);
    await this.inputPasswordCreateAdmins.setValue(password);
  }
  async editAdmin(name, lastName, email) {
    await this.inputNameEditAdmins.setValue(name);
    await this.inputLastNameEditAdmins.setValue(lastName);
    await this.inputEmailEditAdmins.setValue(email);
  }
  async editProfile(name, lastName, email) {
    await this.profileInputName.setValue(name);
    await this.profileInputLastName.setValue(lastName);
    await this.profileInputEmail.setValue(email);
  }
  async changePassword(password, repeatPassword) {
    await this.inputChangePassword.setValue(password);
    await this.inputChangeRepeatPassword.setValue(repeatPassword);
  }
}

module.exports = new SuperAdminPage();
