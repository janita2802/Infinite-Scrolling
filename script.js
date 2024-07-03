container = document.getElementById("gallery");

let page = 1;
let flag = false; 

window.addEventListener("scroll", function(){
    let clientHeight = document.documentElement.clientHeight;
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;

    console.log(clientHeight, scrollHeight, scrollTop);

    if(Math.ceil(scrollHeight-clientHeight)<= Math.ceil(scrollTop)){
        console.log("we are at the bottom");
        page ++;
        fetchData(page);
        flag = false;
    }
});

console.log(container.offsetHeight);
console.log("clientHeight",container.clientHeight);
console.log("scrollHeight",container.scrollHeight);
console.log("scrollTop", container.scrollTop);

async function fetchData(page){
    try{
        res = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=12`);

        let data = await res.json();
        console.log(data);

        displayPhotos(data);

    }
    catch(error){
        console.log("Error while fetching photos",error);
    }
}

function displayPhotos(data){
    data.forEach(element => {
        const card =  document.createElement("div");
        card.className ="card";

        const image = document.createElement("img");
        image.src = element.url;
        image.alt = element.title;

        const title = document.createElement("h3");
        title.textContent = element.title;

        card.append(image, title);
        container.append(card);
    });
}

fetchData(page);


