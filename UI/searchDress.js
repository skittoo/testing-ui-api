module.exports ={
    '@tags': ['search'], 
    'Searching Dresses Test': function (browser) {
    const searchPage = browser.page.mainPage();
    const queryPage = browser.page.queryPage();
    
    // Go to the main page and search for Dress
    searchPage
            .navigate()
            .performSearch('Dress');
    
    queryPage.waitForElementVisible('@productList', 5000);

    // Get product names and check for the presence of 'Dress'
    queryPage.verifyProductNames();

    }
}

  
