const baseURL = "http://localhost:3000/countries";
const countryList = document.getElementById("list");
const searchBar = document.getElementById('search-box');
const divDisplay = document.getElementById('container')

document.addEventListener("DOMContentLoaded", () => {
    //call all the init functions to set everything into motion
    initCountries();
    initSearchBar();
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
        card.addEventListener('click', (e)=> {
            e.preventDefault()
            displayCountry(country);
            //displayCountry(makeCountriesArr(country));
        })
    });
}

function clearNodes(parent) {
    //to clear anything previously searched for when searching new stuff
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function displayCountry(country) { //countries
        //clear out previous search
        clearNodes(divDisplay);
        //for (let country of countries) {
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
        
        //set ids for CSS styling
        displaySection.id = 'display';
        divFlag.id = 'div-flag';
        mainFlag.id = 'main-flag';
        countryName.id = "country-name";
        capitalName.id = "capital";
        languageNames.id = "languages";
        divInfo.id = 'main-info';
        //put inner text
        countryName.innerText = `Country: ${country.name.common}`;
        capitalName.innerText = `Capital: ${country.capital}`;
        languageNames.innerText = `Native Language(s): ${newLanguages}`;
        mainFlag.textContent = country.flag;
        //append everrything
        divFlag.appendChild(mainFlag);
        divInfo.appendChild(countryName);
        divInfo.appendChild(capitalName);
        divInfo.appendChild(languageNames);
        displaySection.appendChild(divFlag);
        displaySection.appendChild(divInfo);
        divDisplay.appendChild(displaySection);
    //}
}

function search(input) {
    //makes a fetch request and for all countries looks for key (via the dropdown value), and checks versus the value of the input
    fetch(baseURL)
    .then(resp => resp.json())
    .then(countries => {
        //for (let i = 0; i <arguments.length; i++) {
            let countryToAdd = countries.find((country) => country["name"]["common"].toUpperCase() === input.toUpperCase());
            //countriesArr.push(countryToAdd);
            displayCountry(countryToAdd);
        if(countryToAdd === undefined) {
            alert("Apologies, there are no countries that match your query. Perhaps try checking your spelling.");
        }})}
    //displayCountry(makeCountriesArr(input));