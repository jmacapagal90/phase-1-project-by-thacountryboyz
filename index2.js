const baseURL = "http://localhost:3000/countries";
const countryList = document.getElementById("list");
const searchBar = document.getElementById('search-box');
const divDisplay = document.getElementById('container')
let countriesArr = [];
let currentOb = {};
let countryToAdd = {};

document.addEventListener("DOMContentLoaded", () => {
    //call all the init functions to set everything into motion
    initCountries();
    initSearchBar();
    search("Angola", "asdf", "Honduras");
    //search("United States");
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
        let input = e.target["name"].value;
        search(input);
        e.target.reset();
    })
}

async function makeCountriesArr(...args) {
    countriesArr.splice(0, countriesArr.length);
    await fetch(baseURL)
        .then(resp => resp.json())
        .then(async (countries) => {
            let values = Object.values(args[0]);
            for (let i = 0; i < values.length; i++) {
                if(typeof(args[i]) === 'object'){
                    countryToAdd = countries.find((country) => country["name"]["common"].toUpperCase() === values[i].toUpperCase());
                    if(countryToAdd === undefined) {
                        alert(`Apologies, there are no countries that match your query of ${values[i]}. Perhaps try checking your spelling.`);
                    }
                    else {countriesArr.push(countryToAdd)};
                }
                else {
                    let countryToAdd = countries.find((country) => country["name"]["common"].toUpperCase() === values[i].toUpperCase());
                if(countryToAdd === undefined) {
                    alert(`Apologies, there are no countries that match your query of ${values[i]}. Perhaps try checking your spelling.`);
                }
                else {countriesArr.push(countryToAdd)};
    }}})
    return countriesArr;
}

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

function displayCountry(country) {
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

async function search(...input) {
    clearNodes(divDisplay);
    await makeCountriesArr(input);
    for (let i = 0; i < countriesArr.length; i++){
        displayCountry(countriesArr[i])}
    countriesArr.splice(0, countriesArr.length);
}