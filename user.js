 // Load a user using the QuickUser class
user = new QuickUser();

// Read the user ID that was assigned
var id = user.get("id");
var hits = user.get("hits");
var registered = user.get("registered");

// Assign the register function to the onClick event of the register button
$('#registerButton').click( function() { register(); } );

console.log(id);
console.log(hits);

// If this user has been here several times ask them to register
if (hits >= 3) {
    // If they are not registered
    if (registered != true) {
        // Ask them to register
        $('.register').show();
    }
}

// Register the app
function register() {
    console.log('registering');
    // Set the user value to registered
    user.set("registered", true);
    // If the email address is not blank
    if ($("#email").val() != '') {
        // Set the users email address
        user.set("email", $('#email').val() );
        // TODO: Submit the email address to the API
        console.log('TODO: API Call');
    }
    // Hide the dialog
    $('.register').hide();
}