const validValues = ['1', '2'];
const invalidValues = [];
const required = true;

module.exports = {
    elements: {
      identifier: '#id_contact',
    },
    commands: [
        {
        setElementValue(optionValue) {
            return this
                .click('@identifier')  // Click on the <select> element to open the dropdown
                .setValue('@identifier', optionValue)  // Set the value of the <select> element
                .click(`option[value="${optionValue}"]`);  // Click on the desired option
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
            return this
               .setElementValue('0');
        },
        getSelectedContactOption() {
            return this.getAttribute('@identifier', 'value');
        },
            }
    ]
  }
  