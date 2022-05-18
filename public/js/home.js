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


// ************************* sidebar *********************

let home = document.getElementById('home');
let slider = document.getElementById('slider');
let image = document.querySelectorAll('#slider img')


let Timages = image.length;
let size = home.clientWidth;

slider.style.width = "" + (Timages) * size + "px";
for (let i = 0; i < Timages; i++) {
    image[i].style.width = "" + size + "px";
}
// console.log(image[0].clientWidth);

let counter = 1;
slider.style.transform = "translate(" + (-size * counter) + "px)";
counter++;
function sliding() {
    if (counter == Timages) {
        counter = 1;
        slider.style.transition = "none";
        slider.style.transform = "translate(" + (-size * counter) + "px)";
        counter++;
    }
    else {
        slider.style.transition = "transform 1s ease-in-out";
        slider.style.transform = "translate(" + (-size * counter) + "px)";
        counter++;
    }
}
setInterval(sliding, 3000);



// ************************** items ************************

let item = document.getElementsByClassName('item');
let container = document.getElementsByClassName('container');
let sliding_bar = document.getElementsByClassName('sliding_bar');

for (let i = 0; i < item.length; i++) {
    console.log(item[i].clientHeight);
    item[i].style.height = sliding_bar[0].clientHeight;
    console.log(item[i].clientHeight);
}

fetch('/laptop')
    .then(res => res.json())
    .then(data => {
        let len = data.length;
        for (let i = 0; i < len; i++) {
            // console.log(data[i]);
            let overview = data[i].detail.substring(0, 30);
            overview += "...";
            sliding_bar[0].innerHTML += '<a href="/product"><div class="item"><img src=' + '"http://drive.google.com/uc?export=view&id='+ data[i].link[0] +'" alt="Error"><p class="info">' + overview + '</p><p class="price"><strong>PRICE</strong>: <span>&#8377</span>' + data[i].price + '</p></div></a>';
        }

        for (let i = 0; i < item.length; i++) {

            // item[i].style.width = "" + sliding_bar[0].clientWidth/5 + "px";
            item[i].addEventListener("mouseover", ()=>{
                item[i].querySelector(".info").style.color = "blue";
                item[i].querySelector(".price").style.color = "red";
            })
            item[i].addEventListener("mouseout", ()=>{
                item[i].querySelector(".info").style.color = "black";
                item[i].querySelector(".price").style.color = "black";
            })
    
            item[i].addEventListener("click", () => {
                fetch("/product", {
                    method: "POST",
                    headers: {
                        // 'Accept': 'application/json',
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data[i])
                }).then(function(res){
                    return res.json();
                }).then(function(data){
                    console.log(data);
                }).catch(function(err){
                    console.log(err);
                })
            })
        }
    });



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




window.onbeforeunload = function() {
    localStorage.clear();
 }