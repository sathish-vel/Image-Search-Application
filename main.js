const accessKey         = "60E-QX3syE7fHfyKTQ-IPPGkpe5xX02TedF70BcTsr8";

const formEle           = document.querySelector('form');
const inputSearch       = document.getElementById('search-input');
const searchBtn         = document.getElementById('search-button');
const searchResultsEle  = document.querySelector('.search-results');
const showMoreBtn       = document.getElementById('show-more-button');

let inputData           = '';
let pageNo              = 1;
let searchImageContent = '';

async function searchImage(){
    let inputData        = inputSearch.value;
    let url              = `https://api.unsplash.com/search/photos?page=${pageNo}&query=${inputData}&client_id=${accessKey}`;
    
    const response       = await fetch(url);
    const data           = await response.json();

    const results        = data.results;
    console.log(pageNo)
    if(pageNo === 1){

        searchResultsEle.innerHTML = ''
    }

    results.map((result) => {
        let imageSrc       = result.urls.small;
        let imageAltDesc   = result.alt_description;
        let imageLink      = result.links.html;
        let imageLinkTextContent = result.alt_description;     

        searchImageContent += `<div class="search-result"><img src="${imageSrc}" alt="${imageAltDesc}"><a href="${imageLink}" target="_blank">${imageLinkTextContent}</a></div>`
    })
    searchResultsEle.innerHTML = searchImageContent
    pageNo++
    if(pageNo > 1){
        showMoreBtn.style.display = 'block';
    }
}
searchBtn.addEventListener('click',(event)=>{
    event.preventDefault()
    pageNo = 1;
    searchImageContent = '';

    searchImage();
})
showMoreBtn.addEventListener('click',()=>{
    searchImage();
})
