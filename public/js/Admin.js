let submit_button = document.getElementById('submit');
let submit_display = document.getElementById('submited');
let add = document.getElementById('add');
let upload_file = document.getElementById('upload_file');

// submit_button.addEventListener('mouseover', ()=>{
//     console.log('tarun');
//     if(submit_display.style.display == 'none'){
//         submit_display.style.display = 'flex';
//     }
//     setTimeout(()=>{
//         submit_display.style.display = 'none';
//     }, 5000);
// })

let text = upload_file.innerHTML;

add.addEventListener('click', ()=>{
    upload_file.innerHTML += text;
})




let file1 = document.getElementById('file1');
let file2 = document.getElementById('file2');
let length = document.getElementById('length');
let overview = document.getElementById('overview');
let detail = document.getElementById('detail');
let price = document.getElementById('price');
let series = document.getElementById('series');
let brand = document.getElementById('brand');
let cpu = document.getElementById('cpu');
let color = document.getElementById('color');
let about = document.getElementById('about');

function validation(){
    let check = true;

    if(file1.value == ""){
        document.getElementById("file1_span").innerHTML = "please enter link";
        check = false;
    }
    {
        document.getElementById("file1_span").innerHTML = "";
    }

    if(file2.value == ""){
        document.getElementById("file2_span").innerHTML = "please enter link";
        check = false;
    }
    {
        document.getElementById("file2_span").innerHTML = "";
    }

    if(length.value == ""){
        document.getElementById("length_span").innerHTML = "please enter number of images";
        check = false;
    }
    else{
        document.getElementById("length_span").innerHTML = "";
    }

    if(overview.value == ""){
        document.getElementById("overview_span").innerHTML = "please enter overview";
        check = false;
    }
    else{
        document.getElementById("overview_span").innerHTML = "";
    }

    if(detail.value == ""){
        document.getElementById("detail_span").innerHTML = "please enter detail";
        check = false;
    }
    else{
        document.getElementById("detail_span").innerHTML = "";
    }

    if(price.value == ""){
        document.getElementById("price_span").innerHTML = "please enter price";
        check = false;
    }
    else{
        document.getElementById("price_span").innerHTML = "";
    }

    if(series.value == ""){
        document.getElementById("series_span").innerHTML = "please enter series";
        check = false;
    }
    else{
        document.getElementById("series_span").innerHTML = "";
    }

    if(brand.value == ""){
        document.getElementById("brand_span").innerHTML = "please enter brand";
        check = false;
    }
    else{
        document.getElementById("brand_span").innerHTML = "";
    }

    if(cpu.value == ""){
        document.getElementById("cpu_span").innerHTML = "please enter cpu";
        check = false;
    }
    else{
        document.getElementById("cpu_span").innerHTML = "";
    }

    if(color.value == ""){
        document.getElementById("color_span").innerHTML = "please enter color";
        check = false;
    }
    else{
        document.getElementById("color_span").innerHTML = "";
    }

    if(about.value == ""){
        document.getElementById("about_span").innerHTML = "please enter about";
        check = false;
    }
    else{
        document.getElementById("about_span").innerHTML = "";
    }

    if(check == false){
        return false;
    }
}