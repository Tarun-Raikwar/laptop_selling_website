let name_cust = document.getElementById("name_cust");
let ph = document.getElementById("ph");
let email = document.getElementById("email");
let pass = document.getElementById("pass");
let confirm_pass = document.getElementById("confirm_pass");


function validation(){
    let check = true;
    if(name_cust.value == ""){
        document.getElementById('name_span').innerHTML = "please fill your name";
        check = false;
    }
    else{
        document.getElementById('name_span').innerHTML = "";
    }

    if(ph.value == ""){
        document.getElementById('ph_span').innerHTML = "please fill your phone number";
        check = false;
    }
    else{
        document.getElementById('ph_span').innerHTML = "";
    }

    if(email.value == ""){
        document.getElementById('email_span').innerHTML = "please fill your email";
        check = false;
    }
    else{
        document.getElementById('email_span').innerHTML = "";
    }

    if(pass.value == ""){
        document.getElementById('pass_span').innerHTML = "please create password";
        check = false;
    }
    else{
        document.getElementById('pass_span').innerHTML = "";
    }

    if(pass.value != confirm_pass.value){
        document.getElementById('confirm_pass_span').innerHTML = "password does not match";
        check = false;
    }
    else{
        document.getElementById('confirm_pass_span').innerHTML = "";
    }
    if(check == false){
        return false;
    }
}