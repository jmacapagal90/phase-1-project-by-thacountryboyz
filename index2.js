const baseURL = "http://localhost:3000/countries";
const countryList = document.getElementById("list");
const searchBar = document.getElementById('search-box');
const divDisplay = document.getElementById('container');
const dropDown = document.getElementById("dropdown");
let countriesArr = [];
let countryToAdd = {};
let currentFilter = "name";

document.addEventListener("DOMContentLoaded", () => {
    //call all the init functions to set everything into motion
    initCountries();
    initSearchBar();
    initDropDown();
    //search("Angola", "asdf", "Honduras");
    search(currentFilter, "United States");
})

function initCountries() {
    //pulls data from api and calls addCountries to set up flag grid
    fetch(baseURL)
    .then(resp => resp.json())
    .then(countries => {
       addCountries(countries);
    })
}

function initSearchBar() {
    //adds eventlistener to searchbar
    searchBar.addEventListener('submit', (e) => {
        e.preventDefault();
        let input = e.target["submission"].value;
        search(currentFilter, input);
        e.target.reset();
    })
}

function initDropDown() {
    //inits the dropdown clicks
    let dropName = document.getElementById("drop-name");
    dropName.addEventListener('click', ()=>{currentFilter = "name";
    console.log(currentFilter)
    })
    let dropLanguage = document.getElementById("drop-language");
    dropLanguage.addEventListener('click', ()=>{currentFilter = "languages";
    console.log(currentFilter)
    })
    let dropRegion = document.getElementById("drop-region");
    dropRegion.addEventListener('click', ()=>{currentFilter = "region";
    console.log(currentFilter)
    })
    let dropSubRegion = document.getElementById("drop-subregion");
    dropSubRegion.addEventListener('click', ()=>{currentFilter = "subregion"
    console.log(currentFilter)
    })
    let dropBeaches = document.getElementById("drop-beaches");
    dropBeaches.addEventListener('click', ()=> {currentFilter = "beaches"
    //console.log(currentFilter);
    search('beaches', 0);
})}

async function makeCountriesArr(...args) {
    countriesArr.splice(0, countriesArr.length);
    await fetch(baseURL)
        .then(resp => resp.json())
        .then(async (countries) => {
            let temp = Object.values(args);
            //console.log(temp);
            let category = temp.shift();
            //console.log(category);
            let values = Object.values(temp[0]);
            //console.log(values);
            if (category === "languages") {
                // await languagesChecker(countries, values, category);
            }
            else if (category === "beaches") {
                // await letsGoToTheBeach();
            }
            else if (category === "name") {
                await nameChecker(countries, values, category);
            }
            else {for (let country of countries) {
                    if(country[category].toUpperCase() === values[0].toUpperCase()) {
                            countriesArr.push(country);
                        }
            }}
            //console.log(countriesArr);
            if(countriesArr.length === 0) {
                alert(`Apologies, there are no countries that match your query of ${values[0]} in this filter. Perhaps try checking your spelling or changing to a different filter.`)}
            })
        .then(async() => {
            //console.log(countriesArr);
            return countriesArr;
})}
    
async function nameChecker(countries, values, category) {
for (let i = 0; i < values.length; i++) {
    if(typeof(values[i]) === 'object'){
            countryToAdd = countries.find((country) => country[category]["common"].toUpperCase() === values[i].toUpperCase())
            //console.log(countryToAdd)}
        if(countryToAdd === undefined) {
            alert(`Apologies, there are no countries that match your query of ${values[i]}. in this filter. Perhaps try checking your spelling or changing to a different filter.`)}
        else {countriesArr.push(countryToAdd)
            //console.log(countryToAdd)}
    }}
    else {
        countryToAdd = countries.find((country) => country[category]["common"].toUpperCase() === values[i].toUpperCase())}
        if(countryToAdd === undefined) {
        alert(`Apologies, there are no countries that match your query of ${values[i]}. in this filter. Perhaps try checking your spelling or changing to a different filter.`)}
        else {countriesArr.push(countryToAdd)}
}}

// async function languagesChecker(countries, values, category) {
//     for (let country of countries) {
//         let languages = Object.values(country[category])
//         languages.forEach((language) => {
//             if(language === values[0])
//             console.log(country);
//             countriesArr.push(country)})
//         }
//                 //console.log(countryToAdd)}
//             if(countryToAdd === undefined) {
//                 alert(`Apologies, there are no countries that match your query of ${values[i]}. in this filter. Perhaps try checking your spelling or changing to a different filter.`)}
//             else {countriesArr.push(countryToAdd)
//                 //console.log(countryToAdd)}
//         }
// }

//async function letsGoToTheBeach(){
// if (category === "beaches") {
//     category = "landlocked";
//     values = [true];
//     console.log("we changed the stuff");
//     for (let country of countries) {
//             if(country[category] === values[0]) {
//                     countriesArr.push(country);
//     }
// }}



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

function clearNodes(parent) {
    //to clear anything previously searched for when searching new stuff
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

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
        //adding additional info just cuz
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
        //append everrything
        divFlag.appendChild(mainFlag);
        divInfo.appendChild(countryName);
        divInfo.appendChild(capitalName);
        divInfo.appendChild(languageNames);
        divInfo.appendChild(area);
        divInfo.appendChild(regions);
        displaySection.appendChild(divFlag);
        displaySection.appendChild(divInfo);
        divDisplay.appendChild(displaySection);
}

async function search(category, ...input) {
    clearNodes(divDisplay);
    await makeCountriesArr(category, input);
    for (let i = 0; i < countriesArr.length; i++){
        displayCountry(countriesArr[i])}
    countriesArr.splice(0, countriesArr.length);
}