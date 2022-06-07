let name_cust = document.getElementById("name_cust");
let ph = document.getElementById("ph");
let email = document.getElementById("email");
let pass = document.getElementById("pass");
let confirm_pass = document.getElementById("confirm_pass");



async function validation() {
    let check = true;
    if (name_cust.value == "") {
        document.getElementById('name_span').innerHTML = "please fill your name";
        check = false;
    }
    else {
        document.getElementById('name_span').innerHTML = "";
    }

    if (ph.value == "") {
        document.getElementById('ph_span').innerHTML = "please fill your phone number";
        check = false;
    }
    else if (ph.value.length != 10) {
        document.getElementById('ph_span').innerHTML = "Invalid phone number";
        check = false;
    }
    else {
        document.getElementById('ph_span').innerHTML = "";
    }

    if (email.value == "") {
        document.getElementById('email_span').innerHTML = "please fill your email";
        check = false;
    }
    else {
        document.getElementById('email_span').innerHTML = "";
    }

    if (pass.value == "") {
        document.getElementById('pass_span').innerHTML = "please create password";
        check = false;
    }
    else if (pass.value.length < 8) {
        document.getElementById('pass_span').innerHTML = "Password should be of 8 digits";
        check = false;
    }
    else {
        document.getElementById('pass_span').innerHTML = "";
    }

    if (pass.value != confirm_pass.value) {
        document.getElementById('confirm_pass_span').innerHTML = "password does not match";
        check = false;
    }
    else {
        document.getElementById('confirm_pass_span').innerHTML = "";
    }

    if (check == false) {
        return false;
    }

    return true;
}

document.getElementById('submit').addEventListener('click', async(e) => {

    e.preventDefault();
    let respose = await validation();

    if(respose == true){
        fetch("/signup_data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name_cust: name_cust.value,
                PhNo: ph.value,
                Email: email.value,
                pass: pass.value
            })
        }).then(function (res) {
            return res.json();
        }).then(data => {
            console.log(data);
            if(data == true){
                name_cust.value = "";
                ph.value = "";
                email.value = "";
                pass.value = "";
                confirm_pass.value = "";
            }
            else{
                email_span.innerHTML = "Email already exist"; 
            }
        }).catch(err => {
            console.log("REGISTRATION FAILED");
        })
    }

})