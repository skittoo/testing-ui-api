module.exports = {
    elements: {
      productList: '#product_list',
      productListSelector: '#product_list > li > div > div.right-block > h5 > a',
    },
    commands: [
      {
        verifyProductNames() {  
          this.api.elements(
            'css selector',
            this.elements.productListSelector,
            (result) => {
              result.value.forEach((_, index) => {
                this.api.getText(
                  `#product_list > li:nth-child(${index + 1}) > div > div.right-block > h5 > a`,
                  (textResult) => {
                    const productName = textResult.value;
                    this.api.verify.ok(
                        productName.toLowerCase().includes('dress'),
                        `Product name '${productName}' contains 'Dress'`
                      )                    
                  }
                );
              });
            }
          );
          },
      },
    ],
  };
  