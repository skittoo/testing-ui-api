module.exports = {
    // An array of folders (excluding subfolders) where your tests are located;
    // if this is not specified, the test source must be passed as the second argument to the test runner.
    src_folders: ['UI'],
    page_objects_path: ["./UI/contactFormElements", "./UI/pages"],
    webdriver: {
      start_process: true,
      port: 9515,
      server_path: 'node_modules/.bin/chromedriver',
      cli_args: [
        // very verbose geckodriver logs
        // '-vv'
      ]
    },
    
    test_settings: {
      default: {
        desiredCapabilities : {
          browserName : 'chrome',
          chromeOptions : {
            args : ["headless", "no-sandbox", "disable-gpu"]
          }
        }
      }
    }
  };