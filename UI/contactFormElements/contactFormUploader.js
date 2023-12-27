const validValues = ['/home/circleci/project/UI/dump_files/first_option.png'];
const invalidValues = [];
const required = false;

module.exports = {
    elements: {
      identifier: '#fileUpload',
    },
    commands: [
        {
        setElementValue(filePath){
            return this.api.uploadFile(this.elements.identifier,filePath);
        },
        // This is depreciated, we use now browser.uploadFile.
        setElementValueLocal(filePath) {
            return this.api.execute(
                function (fileInputSelector, filePath) {
                    // Trigger the change event on the file input
                    var input = document.querySelector(fileInputSelector);
                    var event = new Event('change', { bubbles: true });
                    Object.defineProperty(event, 'target', {
                        writable: false,
                        value: { files: [new File([''], filePath, { type: 'image/png' })] }
                    });
                    input.dispatchEvent(event);
                },
                [this.elements.identifier.selector, filePath]
            );
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
               .setElementValueLocal('');
        },
        getSelectedContactOption() {
            return this.getAttribute('@identifier', 'value');
        },
            }
    ]
  }
  