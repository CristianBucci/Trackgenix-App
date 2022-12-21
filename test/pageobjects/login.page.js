class AdminPage{

  get inputName() {
    return $('#root > div > div > form > div:nth-child(2) > input');
  }

  get inputLastName() {
    return $('#root > div > div > form > div:nth-child(3) > input');
  }

  get inputEmail() {
    return $('#root > div > div > form > div:nth-child(4) > input');
  }

  get inputPassword() {
    return $('#root > div > div > form > div:nth-child(5) > input');
  }

  get titleAdmin () {
    return $('#root > div > div > div.admins_title__DTti9 > h2')
  }

  get btnCreateAdmin () {
    return $('#root > div > div > div.Table_container__L88FC > div > a')
  }

  get titleCreateAdmin () {
    return $('.form_cardTitle__OrBpx')
  }

  get btnConfirmCreateAdmin () {
    return $('.button_primary__Z2ahL')
  }

  get modalConfirmCreateAdmin () {
    return $('.modalConfirm_overlay__hepSv')
  }

  get btnModalConfirmCreateAdmin () {
    return $('#root > div > div.modalConfirm_overlay__hepSv > div > div > span:nth-child(2) > button.button_primary__Z2ahL')
  }

  get modalCreateAdminSuccess () {
    return $('.modalMessage_overlay__6NYRk')
  }

  get modalCreateAdminSuccessText () {
    return $('#root > div > div.modalMessage_overlay__6NYRk > div > div > span')
  }

  get btnCloseModalCreateAdminSuccess () {
    return $('#root > div > div.modalMessage_overlay__6NYRk > div > span > button')
  }

  get listAdmins () {
    return $('#root > div > div > div.Table_container__L88FC > table > tbody > tr:last-child')
  }

  get nameAdminCreated () {
    return $('#root > div > div > div.Table_container__L88FC > table > tbody > tr:nth-child(12) > td:nth-child(1)')
  }

  get lastNameAdminCreated () {
    return $('#root > div > div > div.Table_container__L88FC > table > tbody > tr:nth-child(12) > td:nth-child(2)')
  }

  get emailAdminCreated () {
    return $('#root > div > div > div.Table_container__L88FC > table > tbody > tr:nth-child(11) > td:nth-child(3)')
  }

  async create(name, lastName, email, password) {
    await this.inputName.setValue(name);
    await this.inputLastName.setValue(lastName);
    await this.inputEmail.setValue(email)
    await this.inputPassword.setValue(password);
  }

}

module.exports = new AdminPage();
