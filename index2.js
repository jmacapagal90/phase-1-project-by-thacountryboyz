const baseURL = "http://localhost:3000/countries";
const countryList = document.getElementById("list");
const searchBar = document.getElementById('search-box');
const divDisplay = document.getElementById('container');
const dropDown = document.getElementById("dropdown");
let countriesArr = [];
let countryToAdd = {};
let currentFilter = "name";
const tropicLat = 24;
const searchInput = document.getElementById('submission')
let travelArr = []
let beenArr = []
let travelButton = document.getElementById('travel')
let beenButton = document.getElementById('been')
let listDiv = document.getElementById('travel-lists')
let beenListDiv = document.getElementById('been-lists')
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    //call all the init functions to set everything into motion
    initCountries();
    initSearchBar();
    initDropDown();
    dreamDestination();
    previousAdventure();
    //search("Angola", "asdf", "Honduras");
    search(currentFilter, "United States");
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function initCountries() {
    //pulls data from api and calls addCountries to set up flag grid
    fetch(baseURL)
    .then(resp => resp.json())
    .then(countries => {
       addCountries(countries);
    })
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function initSearchBar() {
    //adds eventlistener to searchbar
    searchBar.addEventListener('submit', (e) => {
        e.preventDefault();
        let input = e.target["submission"].value;
        search(currentFilter, input);
        e.target.reset();
    })
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function initDropDown() {
    //inits the dropdown clicks
    let dropName = document.getElementById("drop-name");
    dropName.addEventListener('click', ()=>{currentFilter = "name";
    searchInput.setAttribute('placeholder', 'Country Name')
    console.log(currentFilter)
    })
    let dropLanguage = document.getElementById("drop-language");
    dropLanguage.addEventListener('click', ()=>{currentFilter = "languages";
    searchInput.setAttribute('placeholder', 'Languages')
    console.log(currentFilter)
    })
    let dropRegion = document.getElementById("drop-region");
    dropRegion.addEventListener('click', ()=>{currentFilter = "region";
    searchInput.setAttribute('placeholder', 'Region')
    console.log(currentFilter)
    })
    let dropSubRegion = document.getElementById("drop-subregion");
    dropSubRegion.addEventListener('click', ()=>{currentFilter = "subregion";
    searchInput.setAttribute('placeholder', 'Subregion')
    console.log(currentFilter)
    })
    let dropBeaches = document.getElementById("drop-beaches");
    dropBeaches.addEventListener('click', ()=> {currentFilter = "beaches";
    searchInput.setAttribute('placeholder', 'Country Name')
    search('beaches', 0);
    })
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function makeCountriesArr(...args) {
    countriesArr.splice(0, countriesArr.length);
    await fetch(baseURL)
        .then(resp => resp.json())
        .then(async (countries) => {
            let temp = Object.values(args);
            let category = temp.shift();
            let values = Object.values(temp[0]);
            if (category === "languages") {
                await languagesChecker(countries, values, category);
            }
            else if (category === "beaches") {
                await letsGoToTheBeach(countries);
            }
            else if (category === "name") {
                await nameChecker(countries, values, category);
            }
            else {for (let country of countries) {
                    if(country[category].toUpperCase() === values[0].toUpperCase()) {
                            countriesArr.push(country);
                        }
            }}
            if(countriesArr.length === 0) {
                alert(`Apologies, there are no countries that match your query of ${values[0]} in this filter. Perhaps try checking your spelling or changing to a different filter.`)}
            })
        .then(async() => {
            return countriesArr;
})}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
async function nameChecker(countries, values, category) {
for (let i = 0; i < values.length; i++) {
    if(typeof(values[i]) === 'object'){
            countryToAdd = countries.find((country) => country[category]["common"].toUpperCase() === values[i].toUpperCase())
            //console.log(countryToAdd)}
        if(countryToAdd === undefined) {
            alert(`Apologies, there are no countries that match your query of ${values[i]} in this filter. Perhaps try checking your spelling or changing to a different filter.`)}
        else {countriesArr.push(countryToAdd)
            //console.log(countryToAdd)}
    }}
    else {
        countryToAdd = countries.find((country) => country[category]["common"].toUpperCase() === values[i].toUpperCase())}
        if(countryToAdd === undefined) {
        alert(`Apologies, there are no countries that match your query of ${values[i]} in this filter. Perhaps try checking your spelling or changing to a different filter.`)}
        else {countriesArr.push(countryToAdd)}
}}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function languagesChecker(countries, values, category) {
    for (let country of countries) {
        let languages = Object.values(country[category])
        console.log(languages);
        if(languages.find(lang => lang.toUpperCase() === values[0].toUpperCase())){
            console.log(country);
            countriesArr.push(country)}
        }
        if(countryToAdd === undefined) {
                alert(`Apologies, there are no countries that match your query of ${values[i]} in this filter. Perhaps try checking your spelling or changing to a different filter.`)
        }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function letsGoToTheBeach(countries){
    currentFilter = "landlocked";
    for (let country of countries) {
            if(!country[currentFilter]) {
                    if(Math.abs(country["latlng"][0]) < 24){
                    countriesArr.push(country);
    }}
}}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addCountries(countries) {
    //adds grid of countries to click and adds their click event listeners
    countries.forEach((country) => {
        let card = document.createElement('card');
        let div = document.createElement('div');
        let flagEmoji = document.createElement('h1');
        flagEmoji.id = 'flag-emoji'
        div.textContent = country.name.common;
        flagEmoji.textContent = country.flag;
        card.appendChild(flagEmoji);
        card.appendChild(div);
        countryList.appendChild(card);
        card.addEventListener('click', async (e)=> {
            e.preventDefault()
            clearNodes(divDisplay);
            //await makeCountriesArr(countrySub);
            //for (let i = 0; i < countriesArr.length; i++){
            currentFilter = "Country Name";
            displayCountry(country)//};
        })
    })
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function clearNodes(parent) {
    //to clear anything previously searched for when searching new stuff
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function displayCountry(country) {
        //adjusting values from db
        let dLanguages = `${Object.values(country.languages)}`;
        let newLanguages = dLanguages.replace(/,/g, ', ');
        //creating new elements every click
        let displaySection = document.createElement('section');
        let divFlag = document.createElement('div');
        let divInfo = document.createElement('div');
        let mainFlag = document.createElement('h1');
        let countryName = document.createElement('h3');
        let capitalName = document.createElement('h3');
        let languageNames = document.createElement('h3');
        let buttonTravel = document.createElement('button');
        let buttonBeen = document.createElement('button');
        let regions = document.createElement("h3");
        let area = document.createElement("h3");
        //set ids for CSS styling
        displaySection.id = 'display';
        divFlag.id = 'div-flag';
        divInfo.id = 'main-info';
        mainFlag.id = 'main-flag';
        countryName.id = "country-name";
        capitalName.id = "capital";
        languageNames.id = "languages";
        regions.id = "regions";
        area.id = "area";
        //put inner text
        countryName.innerText = `Country: ${country.name.common}`;
        capitalName.innerText = `Capital: ${country.capital}`;
        languageNames.innerText = `Native Language(s): ${newLanguages}`;
        regions.innerText = `Region/Subregion: ${country.region}/${country.subregion}`;
        area.innerText = `Size (sq km): ${country.area}`;
        mainFlag.textContent = country.flag;
        buttonTravel.innerText = "I wanna go there!";
        buttonBeen.innerText = "I've been there!";
        //append everrything
        divFlag.appendChild(mainFlag);
        divInfo.appendChild(countryName);
        divInfo.appendChild(capitalName);
        divInfo.appendChild(languageNames);
        divInfo.appendChild(area);
        divInfo.appendChild(regions);
        divInfo.appendChild(buttonTravel);
        divInfo.appendChild(buttonBeen);
        displaySection.appendChild(divFlag);
        displaySection.appendChild(divInfo);
        divDisplay.appendChild(displaySection);
        //button functions
        initListButtons(buttonTravel, buttonBeen, country);
        currentFilter = "name";
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function search(category, ...input) {
    clearNodes(divDisplay);
    await makeCountriesArr(category, input);
    for (let i = 0; i < countriesArr.length; i++){
        displayCountry(countriesArr[i])}
    countriesArr.splice(0, countriesArr.length);
}

function travel (button, country) {
    button.addEventListener('click', () => {
        travelArr.push(country)
        listCreator(travelArr)
    })
}

function been (button, country) {
    button.addEventListener('click', () => {
        beenArr.push(country)
        beenListCreator(beenArr)
    })
}

function listCreator(array) {
    const ul = document.createElement('ul')
    let li = document.createElement('li')
    array.forEach(country => {
        li.innerText = `${country.name.common}`
        ul.appendChild(li)
        listDiv.appendChild(ul)
        console.log(array)
    })
}

function beenListCreator(array) {
    const ul2 = document.createElement('ul')
    let li2 = document.createElement('li')
    array.forEach(country => {
        li2.innerText = `${country.name.common}`
        ul2.appendChild(li2)
        beenListDiv.appendChild(ul2)
        console.log(array)
    })
}


  


// async function dreamDestination () {
//     travelButton.addEventListener('click', async () => {
//         await search("name", travelArr)
//     })
// }




// function handleToDo (todo){
//     const ul = document.getElementById("tasks")
//     let li  = document.createElement("li")
//     let btn = document.createElement('button')
//     btn.addEventListener('click',handleDelete)
//     btn.textContent = "x"
//     li.textContent = `${todo} `
//     li.appendChild(btn)
//     ul.appendChild(li)
//   }
  
//   function handleDelete(e){
//     e.target.parentNode.remove()
//   }

