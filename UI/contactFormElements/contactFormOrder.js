const validValues = ['order'];
const invalidValues = [];
const required = false;

module.exports = {
    elements: {
      identifier: '#id_order',
    },
    commands: [
        {
        setElementValue(orderValue) {
            return this.setValue('@identifier', orderValue);
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
  