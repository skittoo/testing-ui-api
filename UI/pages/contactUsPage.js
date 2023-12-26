module.exports = {
    elements: {
      pageUrl: "http://automationpractice.multiformis.com/index.php?controller=contact",
      contactDropdown: '#id_contact',
      emailInput: '#email',
      orderInput: '#id_order',
      fileUploadInput: '#fileUpload',
      fileUploadButton: '.action',
      fileUploadFilename: '.filename',
      messageTextarea: '#message',
      errorMessage: '.alert.alert-danger',
      successMessage: '.alert.alert-success'
    },
    
    commands: {
      // ----- Contact options commands ----- 
      // Main function for choosing any contact opton in the form. (required)
      selectContactOption(optionValue) {
        return this
          .click('@contactDropdown')
          .setValue('@contactDropdown', optionValue) 
          .click(`option[value="${optionValue}"]`); 
      },
      selectCustomerService() {
        return this.selectContactOption('2');
      },
  
      selectWebmaster() {
        return this.selectContactOption('1');
      },

      selectNothingOption() {
        return this.selectContactOption('0');
      },
  
      getSelectedContactOption() {
        return this.getAttribute('@contactDropdown', 'value');
      },
  
      isContactDropdownVisible() {
        return this.isVisible('@contactDropdown');
      },

      isContactDropdownValid() {
        return this.getSelectedContactOption() !== '0';
      },

      // ----- Email input commands ----- 
      // Setting the value for email. (required and must be in email format)
      setEmailValue(emailValue) {
        return this.setValue('@emailInput', emailValue);
      },

      isEmailNotEmpty() {
        const emailValue = this.getValue('@emailInput');
        return emailValue.trim() !== '';
      },
      getEmailValue() {
        return this.getValue('@emailInput');
      },
  
      isEmailInputVisible() {
        return this.isVisible('@emailInput');
      },

      // ----- Order input commands ----- 
      // Setting the value for order (optional)
      setOrderValue(orderValue) {
        return this.setValue('@orderInput', orderValue);
      },
  
      getOrderValue() {
        return this.getValue('@orderInput');
      },
  
      isOrderInputVisible() {
        return this.isVisible('@orderInput');
      },

      // ----- File upload commands ----- 
      // Upload a file function.   
      uploadFile(filePath) {
        return this
          .setValue('@fileUploadInput', filePath)
          .click('@fileUploadButton');
      },
  
      getFileUploadValue() {
        return this.getValue('@fileUploadInput');
      },
  
      getFileUploadFilename() {
        return this.getText('@fileUploadFilename');
      },
  
      isFileUploadInputVisible() {
        return this.isVisible('@fileUploadInput');
      },

     // ----- Message input commands ----- 
     // function for setting a message value (required).
     setMessageValue(message) {
        return this.setValue('@messageTextarea', message);
      },
  
      getMessageValue() {
        return this.getValue('@messageTextarea');
      },
  
      isMessageTextareaVisible() {
        return this.isVisible('@messageTextarea');
      }, 
      
      isMessageNotEmpty() {
        const messageValue = this.getValue('@messageTextarea');
        return messageValue.trim() !== '';
      },

     // ----- Error message commands ----- 
     // Check if error is there.
      isErrorMessageVisible() {
        return this.isVisible('@errorMessage');
      },
  
      getErrorMessage() {
        return this.getText('@errorMessage');
      },
  
      getErrorItemCount() {
        return this.elements('@errorListItem').value.length;
      },
  
      getErrorListLength() {
        return this.elements('@errorList').value.length;
      },

      getErrorItemText(index) {
        return this.getText(`@errorListItem:nth-child(${index + 1})`); 
      },

      // ----- Success message commands ----- 
      isSuccessMessageVisible() {
        return this.isVisible('@successMessage');
      }
    },
  };
  