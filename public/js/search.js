// ******************* navbar *******************
let dropdown = document.getElementById("dropdown");
let sidebar = document.getElementById("sidebar");

if (dropdown.style.display == "none") {
    sidebar.style.display = "block";
}

document.getElementsByClassName("logout")[0].style.display = "none";
document.getElementsByClassName("logout")[1].style.display = "none";

dropdown.addEventListener("click", () => {
    if (sidebar.style.display == "none") {
        sidebar.style.display = "block";
    }
    else {
        sidebar.style.display = "none";
    }
})

let user = document.getElementsByClassName('user');
user[0].style.display = "none";
user[1].style.display = "none";

// *********************** navbar end *********************



fetch("/search_product")
    .then(res => {
        return res.json();
    })
    .then(arr => {
        console.log(arr.search);
        fetch("/laptop")
            .then(res => res.json())
            .then(data => {
                let product = new Array;
                let reg = new RegExp(arr.search, "i");
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i].detail);
                    console.log(reg.test(data[i].detail));
                    if(reg.test(data[i].detail)){
                        product.push(data[i]);
                    }
                }
                console.log(product);
                document.querySelector("#results p strong").innerHTML = product.length;
                document.querySelector("#results p span").innerHTML = '"' + arr.search + '"';

                let container = document.getElementById("container");

                for(let i=0; i<product.length; i++){
                    let product_detail;
                    if(window.innerWidth < 588){
                        product_detail = product[i].detail;
                        product_detail = product_detail.substring(0,100);
                    }
                    else{
                        product_detail = product[i].detail;
                       product_detail = product_detail.substring(0, 200);
                    }
                    container.innerHTML += '<a href="/product"><div class="item"><div class="image"><img src=' + '"http://drive.google.com/uc?export=view&id='+ product[i].link[0] +'" alt="Error"></div><div class="details"><p class="about">' + product_detail + "..." + '</p><p class="price_container"><strong>Price : </strong><span>&#8377</span><span class="price">' + product[i].price + '</span></p><p class="offer">Free delivery</p></div></div></a>';
                }

                let item = document.getElementsByClassName('item');
                for(let i=0; i<item.length; i++){
                    item[i].addEventListener("click", () => {
                        fetch("/product", {
                            method: "POST",
                            headers: {
                                // 'Accept': 'application/json',
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(product[i])
                        }).then(function(res){
                            return res.json();
                        }).then(function(data){
                            console.log(data);
                        }).catch(function(err){
                            console.log(err);
                        })
                    })

                    item[i].addEventListener('mouseover', ()=>{
                        item[i].querySelector('.about').style.color = "brown";
                    })

                    item[i].addEventListener('mouseout', ()=>{
                        item[i].querySelector('.about').style.color = "black";
                    })
                }
            })
    })
    .catch(err => {
        console.log(err);
    })




// let container = document.getElementById("container");
// let text = container.innerHTML;
// for (let i = 0; i < 20; i++) {
//     container.innerHTML += text;
// }

setTimeout(()=>{
    document.getElementById('results').style.display = "none";
}, 2000);



// ************************ login form ********************************
let login_form = document.getElementById('login_form');
let login_form_container = document.getElementById('login_form_container');
let login_button = document.getElementsByClassName('account');


for(let i=0; i<login_button.length; i++){
    login_button[i].addEventListener('mouseover', () => {
        login_button.style.cursor = "pointer";
    })
    login_button[i].addEventListener('click', () => {
        login_form.style.transition = "transform 1s ease-in-out";
        // login_form.style.top = "-3200px";
        login_form.style.display = "flex";
        login_form_container.style.display = "block";
        sidebar.style.display = "none";
    })
}


login_form_container.addEventListener('click', ()=>{
    login_form.style.display = "none";
    login_form_container.style.display = "none";
})

login_form.addEventListener('submit', (e)=>{
    e.preventDefault();

    let user_id = document.getElementById('user_id').value;
    let pass = document.getElementById('pass').value;

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            user_id: user_id,
            password: pass
        })
    }).then(function(res){
        return res.json();
    }).then(data =>{
        if(data == false){
            alert("invalid data");
        }
        else{
            login_form.style.display = "none";
            login_form_container.style.display = "none";
            alert("login successfully");
            user[0].style.display = "flex";
            user[1].style.display = "flex";
            // user.getElementsByTagName('a')[0].innerHTML = data.name;
            document.getElementsByClassName('account')[0].style.display = "none";
            document.getElementsByClassName('account')[1].style.display = "none";
            document.getElementsByClassName("logout")[0].style.display = "block";
            document.getElementsByClassName("logout")[1].style.display = "block";
            document.getElementsByClassName("signup")[0].style.display = "none";
            document.getElementsByClassName("signup")[1].style.display = "none";
        }
    }).catch(err =>{
        console.log("cannot loggin");
    })
})

fetch("/check_login")
.then(res =>{
    return res.json();
})
.then(data =>{
    console.log(data);
    user[0].style.display = "flex";
    user[1].style.display = "flex";
    // user.getElementsByTagName('a')[0].innerHTML = data.name;
    document.getElementsByClassName('account')[0].style.display = "none";
    document.getElementsByClassName('account')[1].style.display = "none";
    document.getElementsByClassName("logout")[0].style.display = "block";
    document.getElementsByClassName("logout")[1].style.display = "block";
    document.getElementsByClassName("signup")[0].style.display = "none";
    document.getElementsByClassName("signup")[1].style.display = "none";
})



// ************************** search bar **************************


search_button = document.getElementsByClassName("search_submit");
search = document.getElementsByClassName("search");

for(let i=0; i<search.length; i++){
    search_button[i].addEventListener("click", ()=>{
        fetch("/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "search": search[i].value
            })
        }).then(function(res){
            return res.json();
        }).then(function(data){
            console.log(data);
        }).catch(function(err){
            console.log(err);
        })
        search[i].value = "";
    })
}

