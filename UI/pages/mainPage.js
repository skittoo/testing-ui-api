module.exports = {
    url: 'http://automationpractice.multiformis.com/index.php',
    elements: {
        searchInput:'input#search_query_top',    
        searchButton:'button[name="submit_search"]',
        },
    commands: [
        {
            setSearchInput(value) {
                return this.setValue('@searchInput', value);
            },
            clickSearchButton() {
                return this.click('@searchButton');
            },
            performSearch(query) {
                return this.setSearchInput(query).clickSearchButton();
            },
        },
    ],
};
