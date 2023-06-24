//#got access key from Unsplash API for my project
const accessKey = "rpm3Ol2-lkNg7jisN9wIlrHkQKvuO3fVat-7bmoaW1E";

//#importing all the necessary elemnts from the html to JS.
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

//#Key Variables:
let inputData = ""; 
let page = 1;

//#async function: allows to write asynchronus code, the function will always return a promise. The promise could be accepted by returning the value of the function or rejected by throwing an error.The await keyword is usually used to pause aspects of the function.

//*------------[Beginning of Function]----------------\\
async function searchImage(){
    inputData = inputEl.value; //stores key words for searching.
    //creating a dynamic variable(URL).[will explain later].
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url); //fecthing all the data from the url
    const data = await response.json(); //converting the data to JSON format.

    //converting the JSON data to images and text.
    const results = data.results;

    //initializing page number
    if(page === 1){
        searchResults.innerHTML = "";
    }
    
    //# mapping the results varibale by pushing all the data into our template(the search results class) from html.

    results.map((result) =>{
        //#Idea: trying to replicate the structure of the "Search results body from Javascript alone."

        //~creating an element from JS
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result"); //appending the class name to the class. 
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        //append to html
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    }) 
    //this will loop and create replicates of the initial dislay.

    page++; //incrementing page number
    if(page > 1){
        showMore.style.display = "block"; //because in our styles.css the default display is none, so after page one, we want to show the button.
    }

}
//*------------[End of Function]----------------\\


//#getting an eventlistner for the Search button
formEl.addEventListener("submit", (event) => {
    event.preventDefault(); 
    page = 1;
    searchImage(); //calliing the function.
})

showMore.addEventListener("click", (event) => {
   
    searchImage(); //calliing the function.
})
