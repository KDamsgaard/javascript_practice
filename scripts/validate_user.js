function validateUser() {
    let username = $('#inp_username').val();
    let email = $('#inp_email').val();
    let pw = $('#inp_password').val();
    let repw = $('#inp_reenter_password').val();

    if (username.length == 0) {
        $('#inp_username').attr("placeholder", "You must enter a valid username...");
        return false;
    }
    
    if (email.length == 0) {
        $('#inp_email').attr("placeholder", "You must enter a valid email...");
        return false;
    } 
    
    if (pw == "") {
        $('#inp_password').attr("placeholder", "You must enter a valid password...");
        return false;
    } 
    
    if (pw != repw) {
        $('#inp_reenter_password').attr("placeholder", "Passwords do not match...");
        return false;
    }

    return true;
};
