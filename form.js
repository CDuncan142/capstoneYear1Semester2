/*
Graphite Form Javascript

Author: Conner Duncan
date:   08.17.18

Filename: form.js

*/
//global variables
"Use Strict";

var addListener = null;
var paymentFormValidity = true;

// Calls functions for initial configuration -- NOTE: Purpose unformulated as of yet
function setUpPage() {
    //    alert("3/ setUpPage");
    createEventListeners();
    //remove default option from select lists
    var selectElements = document.getElementsByTagName("select");
    for (var i = 0; i < selectElements.length; i++) {
        selectElements[i].selectedIndex = -1;
    }

    // remove defaults
}

//Calls validation functions when submits
function validatePaymentForm(evt) {
    paymentFormValidity = true;
    //    alert("1/ validatePaymentForm");
    //disable event temporarily
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
    //call validation functions
    validateAddress("billing");
    validateAddress("delivery");
    validateCard();
    //handle form submition (valid ? submit : !submit)
    if (paymentFormValidity === true) {
        document.getElementById("paymentForm").initEvent("submit");
    } else {
        window.scroll(0, 0);
    }
}

// validate input fields for billing and delivery fieldsets
function validateAddress(fieldset) {
    var inputElements = document.querySelectorAll("fieldset#" + fieldset + " input");
    for (var i = 0; i < inputElements.length; i++) {
        if (inputElements[i].value === "") {
            inputElements[i].style.backgroundColor = "rgb(255, 233, 233)";
            paymentFormValidity = false;
        } else {
            inputElements[i].style.backgroundColor = "";
        }
    }
    if (document.getElementById(fieldset + "State").selectedIndex === -1) {
        document.getElementById(fieldset + "State").style.backgroundColor = "rgb(255, 233, 233)";
        paymentFormValidity = false;
    } else {
        document.getElementById(fieldset + "State").style.backgroundColor = "";
    }

}

//function to copy information from the billing address field to the delivery address fields
function copyAddress() {
    var sameCheckbox = document.getElementById("sameAddressCheckbox");
    var billingInputElements = document.querySelectorAll("fieldset#billing input");
    var deliveryInputElements = document.querySelectorAll("fieldset#delivery input")
    if (sameCheckbox.checked === true) {
        for (var i = 0; i < billingInputElements.length; i++) {
            deliveryInputElements[i + 1].value = billingInputElements[i].value;
        }
        document.getElementById("deliveryState").selectedIndex = document.getElementById("billingState").selectedIndex;
    } else {
        for (var i = 0; i < billingInputElements.length; i++) {
            deliveryInputElements[i + 1].value = "";
        }
        document.getElementById("deliveryState").selectedIndex = -1;
    }
}

// validate input fields for card fieldset

function validateCard() {
    var radioButtonInputs = document.getElementsByName("cardType");
    var textInputElements = document.querySelectorAll("#cardInfo .textInput");


    //validate radio buttons
    if (!radioButtonInputs[0].checked && !radioButtonInputs[1].checked && !radioButtonInputs[2].checked && !radioButtonInputs[3].checked && !radioButtonInputs[4].checked) {
        for (var i = 0; i < radioButtonInputs.length; i++) {
            radioButtonInputs[i].style.outline = "1px solid rgb(255, 200, 200)";
        }
        paymentFormValidity = false;
    } else {
        for (var i = 0; i < radioButtonInputs.length; i++) {
            radioButtonInputs[i].style.outline = "";
        }
    }
    //validate input fields
    for (var i = 0; i < textInputElements.length; i++) {
        if (textInputElements[i].value === "") {
            textInputElements[i].style.backgroundColor = "rgb(255, 233, 233)";
            paymentFormValidity = false;
        } else {
            textInputElements[i].style.backgroundColor = "";
        }
    } //<-for loop bracket
} //<--validate card bracket


//creates event listeners
function createEventListeners() {
    //    alert("2/ createEventListeners");
    //submit event listener
    if (addListener) { //global variable
        window.addEventListener("submit", validatePaymentForm, false);
        document.getElementById("sameAddressCheckbox").addEventListener("change", copyAddress, false);

    } else if (addListener === false) { //made it test for false so that null wouldn't activate it
        window.attachEvent("onsubmit", validatePaymentForm);
        document.getElementById("sameAddressCheckbox").addEventListener("onchange", copyAddress);
    } else {
        addListener = null;
        alert("Please try again. If this does not work then use another browser.");
    }

    //Event listeners for form inputs

    //Add event listeners to radio buttons in the payment fieldset
    /*var radioPaymentElements = document.querySelectorAll("fieldset#cardInfo input.radio");

    for (var i = 0; i < radioPaymentElements.length; i++) {
        if (addListener === null) {
            //already would have notified the user.
            continue;
        } else if (addListener === true) {
            radioPaymentElements[i].addEventListener("change", switchPaymentRadioButton, false);
        } else if (addListener === false) {
            radioPaymentElements[i].attachEvent("onchange", switchPaymentRadioButton);
        }
    }*/

}

// event listeners
if (window.addEventListener) {
    //    alert("if -- true");
    addListener = true;
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    //    alert("if -- false");
    addListener = false;
    window.attachEvent("onload", setUpPage);
}
