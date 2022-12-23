
let $nextBtn = $(".next-password");
let $firstInputSection = $(".signup-first");
let $secondInputSection = $(".signup-second");
let $nameInput = $("input[name='name']");
let $dobInput = $("input[name='dob']");
let $phoneInput = $("input[name='phone']");
let $countryCode = $("select[name='country_id']");
let $emailInput = $("input[name='login']");
let $passwordInput = $("input[name='password']");
let $confirmPasswordInput = $("input[name='confirm_password']");
// Function to validate Emails
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
}
function resetFormValidation() {
    // Remove all error message before validate
    $nameInput.parent().next().removeClass('d-block');
    $dobInput.parent().next().removeClass('d-block');
    $phoneInput.parent().parent().next().removeClass('d-block');
    $emailInput.parent().next().removeClass('d-block');
    $emailInput.parent().next().next().removeClass('d-block');
    $nameInput.removeClass('invalid-input');
    $dobInput.removeClass('invalid-input');
    $phoneInput.removeClass('invalid-input');
    $countryCode.removeClass('invalid-input');
    $emailInput.removeClass('invalid-input');
}
// Validate input field and display proper error message if any
function ValidateForm() {
    if (!$nameInput.val().length) {
        $nameInput.parent().next().addClass('d-block');
        $nameInput.addClass('invalid-input');
        return false;
    } else if (!$dobInput.val().length) {
        $dobInput.parent().next().addClass('d-block');
        $dobInput.addClass('invalid-input');
        return false;
    } else if (!$phoneInput.val().length) {
        $phoneInput.parent().parent().next().addClass('d-block');
        $phoneInput.addClass('invalid-input');
        $countryCode.addClass('invalid-input');
        return false;
    } else if (!$emailInput.val().length) {
        $emailInput.parent().next().addClass('d-block');
        $emailInput.addClass('invalid-input');
        return false;
    } else if (!validateEmail($emailInput.val())) {
        $emailInput.parent().next().next().addClass('d-block');
        $emailInput.addClass('invalid-input');
        return false;
    }
    else return true

}
// Go to password form if the current form is valid
$nextBtn.click(function () {
    resetFormValidation();
    if (ValidateForm()) {
        $firstInputSection.css('top', '-150%');
        $secondInputSection.css('left', '50%');
    }
});
function validatePassword(){
    $passwordInput.parent().next().not('.d-block').addClass('d-block');
    let pass = $passwordInput.val();
    //validate the length
    let validLength;
    let validCapital;
    let validNumber;
    let validSpecial;
    if (pass.length < 8) {
        $('.length').removeClass('valid').addClass('invalid');
        $('.length').children().removeClass('fa-circle-check').addClass('fa-times');
        validLength = false
    } else {
        $('.length').removeClass('invalid').addClass('valid');
        $('.length').children().removeClass('fa-times').addClass('fa-circle-check');
        validLength = true
    }

    //validate capital letter
    if (pass.match(/[A-Z]/)) {
        $('.capital').removeClass('invalid').addClass('valid');
        $('.capital').children().removeClass('fa-times').addClass('fa-circle-check');
        validCapital = true
    } else {
        $('.capital').removeClass('valid').addClass('invalid');
        $('.capital').children().removeClass('fa-circle-check').addClass('fa-times');
        validCapital = false
    }

    //validate number
    if (pass.match(/\d/)) {
        $('.number').removeClass('invalid').addClass('valid');
        $('.number').children().removeClass('fa-times').addClass('fa-circle-check');
        validNumber = true
    } else {
        $('.number').removeClass('valid').addClass('invalid');
        $('.number').children().removeClass('fa-circle-check').addClass('fa-times');
        validNumber = false
    }
    if (pass.match(/[^A-Za-z 0-9]/g)) {
        $('.special').removeClass('invalid').addClass('valid');
        $('.special').children().removeClass('fa-times').addClass('fa-circle-check');
        validSpecial=true
    } else {
        $('.special').removeClass('valid').addClass('invalid');
        $('.special').children().removeClass('fa-circle-check').addClass('fa-times');
        validSpecial=false
    }
    return validNumber && validCapital && validLength && validSpecial;

}
// Check for password validation on blur event 
$passwordInput.blur(function () {
    validatePassword();
});
// Validate both password match
function validateConfirmPassword() {
    let password = $passwordInput.val();
    let confirm_password = $confirmPasswordInput.val();
    if (password === confirm_password) {
        $confirmPasswordInput.parent().next().removeClass('d-block')
        return true;
    } else {
        $confirmPasswordInput.parent().next().addClass('d-block')
        return false;
    }
}
$confirmPasswordInput.blur(function () {
    validateConfirmPassword();
});
function validatePasswords(){
    return validateConfirmPassword() && validatePassword
}