// Setup some variables
var url = 'http://localhost/~joel/sandbox/';
var lastRiff = '';

casper.test.begin("Random riffs are calculated", 2, function(test) {
    
    casper.start(url + 'random_riff/', function() {
        // The dropdown exists
        test.assertExists('select#key');
    });
    
    casper.then(function() {
        // The dropdown exists
        test.assertExists('select#key');
    });
    
    casper.run(function() {
       test.done(); 
    });
    
});

