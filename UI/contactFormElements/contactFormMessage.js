const validValues = ['message'];
const invalidValues = [];
const required = true;

module.exports = {
    elements: {
      identifier: '#message',
    },
    commands: [
        {
        setElementValue(messageValue) {
            return this.setValue('@identifier', messageValue);
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
     }
    ]
  }
  