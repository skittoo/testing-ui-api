module.exports = {
    elements: {
      submitMessageButton: {
        selector: '#submitMessage',
        locateStrategy: 'css selector',
      },
    },
    commands: [{
      submitMessage: function () {
        return this.click('@submitMessageButton');
      },
    }],
  };