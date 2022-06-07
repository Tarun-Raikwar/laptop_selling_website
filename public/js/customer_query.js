let container = document.getElementById('container');

fetch("/query")
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        for(let i=0; i<data.length; i++){
            container.innerHTML += '<div class="query"><div class="overview"><p class="name">' + data[i].name + '</p><p class="message">' + data[i].message.substr(0, 60)+"..." + '</p><p>' + data[i].date + '</p><p class="show">Show details</p></div><div class="detail"><p><Strong>Name : </Strong>' + data[i].name + '</p><p><Strong>Email : </Strong> ' + data[i].Email + '</p><p><Strong>Message : </Strong>' + data[i].message + '</p></div></div>'

        }
        let show = document.getElementsByClassName('show');
        let detail = document.getElementsByClassName('detail');
        for(let i=0; i<show.length; i++){
            show[i].addEventListener('click', ()=>{
                console.log("tarun");
                if(detail[i].style.display == "none"){
                    detail[i].style.display = "block";
                }
                else{
                    detail[i].style.display = "none";
                }
            })
        }
    })
    .catch(err => console.log(err));