module.exports = {
    elements: {
      errorMessage: '.alert.alert-danger',
      successMessage: '.alert.alert-success',
      errorList: '.alert.alert-danger ol',
      errorListItem: '.alert.alert-danger ol li',
    },
    commands: [
      {
        // ----- ERROR COMMANDS -----
        isErrorMessageVisible() {
          return this.isVisible('@errorMessage');
        },
        getErrorMessage() {
          return this.getText('@errorMessage');
        },
        getErrorListLength() {
            return this.api.elements('css selector', '@errorList', (result) => result.value.length);
        },
        getErrorItemText(index) {
          return this.getText(`@errorListItem:nth-child(${index + 1})`);
        },
  
        // ----- Success message commands -----
        isSuccessMessageVisible() {
          return this.isVisible('@successMessage');
        },
      },
    ],
  };
  