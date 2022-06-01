const baseURL = "http://localhost:3000/countries";
const countryList = document.getElementById("list");
const searchBar = document.getElementById('search-box');
let idCounter = 1;
let currentId = 1;
const displayFlag = document.getElementById('main-flag')
const displayName = document.getElementById('country-name')
const displayCapital = document.getElementById('capital')
const displayLanguages = document.getElementById('languages')
//let USACounter;

document.addEventListener("DOMContentLoaded", () => {
    //this will contain all our initilization functions -> setting up event listeners for form, buttons, etc.
    initCountries();
    initSearchBar();
    //displayCountry(USACounter); //autoset to display the USA
})

//new function to initialize flags (countrys)
function initCountries() {
    fetch(baseURL)
    .then(resp => resp.json())
    .then(countries => {
       addCountries(countries);
    })
}

function initSearchBar() {
    searchBar.addEventListener('submit', (e) => {
        e.preventDefault();
        let input = e.target["name"].value;
        search(input);
        e.target.reset();
    })
}

//new function to put countries on screen
function addCountries(countries) {
    countries.forEach((country) => {
        let div = document.createElement('div');
        let card = document.createElement('card');
        let p = document.createElement('p');
        div.textContent = country.name.common;
        p.textContent = country.flag;
        p.id = idCounter;
        div.id = idCounter;
        card.appendChild(p);
        card.appendChild(div);
        countryList.appendChild(card);

        card.addEventListener('click', (e)=> {
            e.preventDefault()
            let dLanguages = `${Object.values(country.languages)}`
            let newLanguages = dLanguages.replace(/,/g, ', ')
            displayName.innerText = `Country: ${country.name.common}`
            displayCapital.innerText = `Capital: ${country.capital}`
            displayLanguages.innerText = `Native Language(s): ${newLanguages}`
            displayFlag.textContent = country.flag
        })
        idCounter++;
    });
}

function displayCountry(id) {
    //need a default
    fetch(baseURL + "/" + id)
    .then(resp => resp.json())
    .then(country => {
        //set all the main display values to that of the country selected
        currentId = parseInt(id);
    })
}

function search(input) {
    //makes a fetch request and for all countries looks for key (via the dropdown value), and checks versus the value of the input
    //then will clear the currently displayed countries (call another clear function) and
    //console.log(input);
    fetch(baseURL)
    .then(resp => resp.json())
    .then(countries => {
        for(let country of countries)
            //console.log(country.name.common);
            if (country["name"]["common"].toUpperCase() === input.toUpperCase()){
                //displayCountry(country["name"])
                let dLanguages = `${Object.values(country.languages)}`
                let newLanguages = dLanguages.replace(/,/g, ', ')
                displayName.innerText = `Country: ${country.name.common}`
                displayCapital.innerText = `Capital: ${country.capital}`
                displayLanguages.innerText = `Native Language(s): ${newLanguages}`
                displayFlag.textContent =  `${country.flag}`
            }
        }
)}