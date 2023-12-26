const contactPageUrl = "http://automationpractice.multiformis.com/index.php?controller=contact";
const contactUsDropDown = browser.page.contactFormDropDown();
const contactUsEmail = browser.page.contactFormEmail();
const contactUsOrder = browser.page.contactFormOrder();
const contactUsMessage = browser.page.contactFormMessage();
const contactUsAlerts = browser.page.contactFormAlerts();
const contactUsSubmit = browser.page.contactFormSubmit();
const contactUsUploader = browser.page.contactFormUploader();
// Array of all fields 
const elementsArray = [contactUsDropDown, contactUsEmail,
                       contactUsOrder, contactUsMessage,
                       contactUsUploader
                    ];
// Number of required fields in the form. TODO: generated automatically.
const required = 3;

module.exports = {
  '@tags': ['contact'], 
  'Testing the functionality of Contact Us page.': function (browser) {
    browser.url(contactPageUrl); // Navigate to the contact page URL

    const indicesArray = Array.from({ length: elementsArray.length }, (_, index) => index);

    const combinationsIndices = combinations(indicesArray);

    for (let arrIndex = 0; arrIndex < combinationsIndices.length; arrIndex++) {
      let combination = [];
      for (let m = 0; m < combinationsIndices[arrIndex].length; m++) {
        combination.push(elementsArray[combinationsIndices[arrIndex][m]]);
      }
      handleElementsCombination(combination, browser);
    }

    // End the test
    browser.end();
  },
};

// Function to calculate the Cartesian product of arrays
function getCartesianProduct(arrays) {
  return arrays.reduce((a, b) =>
    a.map(x => b.map(y => x.concat(y))).reduce((c, d) => c.concat(d), []), [[]]);
}

function handleElementsCombination(elementsCombination, browser) {
  const len = elementsCombination.length;

  // Generate all combinations of valid values for each element
  const allValueCombinations = getCartesianProduct(elementsCombination.map(el => el.getValues()));

  // Iterate through each combination
  allValueCombinations.forEach((combination) => {
    let errors = 0;
    let combinationRequired = 0;
    elementsCombination.forEach((element, index) => {
      const value = combination[index];
      const invalidValues = element.getInvalidValues();

      if (invalidValues.includes(value)){
        errors += 1; // increase error messages by 1.
        }
      if(element.isRequired()){
        combinationRequired += 1;
        }
      
      element.setElementValue(value);


      browser.pause(100);
    });

    // Check if the combination has less than the required values.
    if(combinationRequired < required){
        errors += (required - combinationRequired);
    }

    browser.pause(2000);

    contactUsSubmit.submitMessage();
    browser.pause(1000);    

    if(errors > 0){
        browser.assert.ok(contactUsAlerts.isErrorMessageVisible(), 'Error message is visible');
        browser.elements('css selector', '#center_column > div > ol', (result) => {
            browser.verify.ok(result.value.length === errors, `Numbers of errors should be ${errors}`)
        })
    }
    else{
        browser.assert.ok(contactUsAlerts.isSuccessMessageVisible(), 'Success message is visible');
        // console.log("success combination")
    }

    // Save screenshot for the current combination
    const screenshotName = combination.join('_');
    browser.saveScreenshot(`tests_output/${screenshotName}.png`);

    browser.url(contactPageUrl);
    browser.pause(1000);

    elementsArray.forEach((element)=>{
        element.setElementEmpty();
    })

});
}

function k_combinations(set, k) {
    var i, j, combs, head, tailcombs;
  
    if (k > set.length || k <= 0) {
      return [];
    }
  
    if (k == set.length) {
      return [set];
    }
  
    // There is N 1-sized subsets in a N-sized set.
    if (k == 1) {
      combs = [];
      for (i = 0; i < set.length; i++) {
        combs.push([set[i]]);
      }
      return combs;
    }
  
    combs = [];
    for (i = 0; i < set.length - k + 1; i++) {
      head = set.slice(i, i + 1);
      tailcombs = k_combinations(set.slice(i + 1), k - 1);
      for (j = 0; j < tailcombs.length; j++) {
        combs.push(head.concat(tailcombs[j]));
      }
    }
    return combs;
  }
  
  function combinations(set) {
    var k, i, combs, k_combs;
    combs = [];
  
    // Calculate all non-empty k-combinations
    for (k = 1; k <= set.length; k++) {
      k_combs = k_combinations(set, k);
      for (i = 0; i < k_combs.length; i++) {
        combs.push(k_combs[i]);
      }
    }
    return combs;
  }
  