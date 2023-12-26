const validValues = ['hend@gmail.com'];
const invalidValues = ['hend'];
const required = true;


module.exports = {
    elements: {
      identifier: '#email',
    },
    commands: [
        {
        setElementValue(emailValue) {
            return this.setValue('@identifier', emailValue);
            },
        getValues(){
            return validValues.concat(invalidValues);
        },
        getValidValues(){
            return validValues;
        },
        getInvalidValues(){
            return invalidValues;
        },
        isRequired(){
            return required;
        },
        setElementEmpty() {
            return this.setElementValue('');
        } ,     
        isEmailNotEmpty() {
            const emailValue = this.getValue('@identifier');
            return emailValue.trim() !== '';
        },
        getEmailValue() {
            return this.getValue('@identifier');
        },
        isEmailInputVisible() {
            return this.isVisible('@identifier');
        },
     }
    ]
  }
  