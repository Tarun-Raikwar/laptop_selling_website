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

// ************************ navbar end **************************



let slider = document.getElementById('slider');

let i=0;


fetch("/product_data")
.then(function (res) {
    return res.json();
})
.then(function (data) {
    
    slider.innerHTML = '<div class="image"><img src=' + '"http://drive.google.com/uc?export=view&id='+ data.link[i] +'" alt="Error"></div>';
    slider.style.height = "" + slider.clientWidth + "px";
    console.log(slider.clientHeight);
    
        let left = document.getElementById('left');
        let right = document.getElementById('right');

        left.style.top = "" + slider.clientHeight / 2 + "px";
        right.style.top = "" + slider.clientHeight / 2 + "px";

        left.addEventListener('mouseover', ()=>{
            left.style.opacity = "1";
        })
        left.addEventListener('mouseout', ()=>{
            left.style.opacity = "0.5";
        })
        right.addEventListener('mouseover', ()=>{
            right.style.opacity = "1";
        })
        right.addEventListener('mouseout', ()=>{
            right.style.opacity = "0.5";
        })


        left.addEventListener('click', () => {
            if(i==0){
                i=data.length-1;
            }
            else{
                i--;
            }
            slider.innerHTML = '<div class="image"><img src=' + '"http://drive.google.com/uc?export=view&id='+ data.link[i] +'" alt="Error"></div>';
        })

        right.addEventListener('click', () => {
            if(i==data.length-1){
                i=0;
            }
            else{
                i++;
            }
            slider.innerHTML = '<div class="image"><img src=' + '"http://drive.google.com/uc?export=view&id='+ data.link[i] +'" alt="Error"></div>';
        })


        // *********************** add product data *************************
        let price = document.getElementById('price');
        let detail = document.getElementById('detail');
        let series = document.getElementById('series');
        let brand = document.getElementById('brand');
        let cpu = document.getElementById('cpu');
        let graphicCard = document.getElementById('graphic_card');
        let color = document.getElementById('color');
        let about = document.getElementById('about');

        price.innerHTML += data.price;
        detail.innerHTML = data.detail;
        series.innerHTML = data.series;
        brand.innerHTML = data.brand;
        cpu.innerHTML = data.cpu;
        graphicCard.innerHTML = data.graphic_card;
        color.innerHTML = data.color;


    })



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
        sidebar.style.display == "none";
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



