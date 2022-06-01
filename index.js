const baseURL = "http://localhost:3000/countries";
const countryList = document.getElementById("list");
const searchBar = document.getElementById('search-box');
const divDisplay = document.getElementById('container')

// let idCounter = 1;
// let currentId = 1;
// const displayFlag = document.getElementById('main-flag')
// const displayName = document.getElementById('country-name')
// const displayCapital = document.getElementById('capital')
// const displayLanguages = document.getElementById('languages')
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
        let card = document.createElement('card');
        let div = document.createElement('div');
        let flagEmoji = document.createElement('h1');
        flagEmoji.id = 'flag-emoji'
        div.textContent = country.name.common;
        flagEmoji.textContent = country.flag;
        //p.id = idCounter;
        //div.id = idCounter;
        card.appendChild(flagEmoji);
        card.appendChild(div);
        countryList.appendChild(card);

        card.addEventListener('click', (e)=> {
            e.preventDefault()
            removeAllChildNodes(divDisplay)
            //adjusting values from db
            let dLanguages = `${Object.values(country.languages)}`
            let newLanguages = dLanguages.replace(/,/g, ', ')
            //creating new elements every click
            let displaySection = document.createElement('section') 
            let divFlag = document.createElement('div')
            let divInfo = document.createElement('div')
            let mainFlag = document.createElement('h1')
            let countryName = document.createElement('h3')
            let capitalName = document.createElement('h3')
            let languageNames = document.createElement('h3')
            //set ids for CSS styling
            displaySection.id = 'display'
            mainFlag.id = 'main-flag'
            countryName.id = "country-name"
            capitalName.id = "capital"
            languageNames.id = "languages"
            divInfo.id = 'main-info'
            //put inner text
            countryName.innerText = `Country: ${country.name.common}`
            capitalName.innerText = `Capital: ${country.capital}`
            languageNames.innerText = `Native Language(s): ${newLanguages}`
            mainFlag.textContent = country.flag
            //append everrything
            divFlag.appendChild(mainFlag)
            divInfo.appendChild(countryName)
            divInfo.appendChild(capitalName)
            divInfo.appendChild(languageNames)
            displaySection.appendChild(divFlag)
            displaySection.appendChild(divInfo)
            divDisplay.appendChild(displaySection)
            console.log(divDisplay)
        })
        //idCounter++;
    });
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
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
        let country = countries.find((country) => country["name"]["common"].toUpperCase() === input.toUpperCase());
        if(country === undefined) {
            alert("That's not a country. Please check your spelling.");
        }
        let dLanguages = `${Object.values(country.languages)}`;
        let newLanguages = dLanguages.replace(/,/g, ', ');
        displayName.innerText = `Country: ${country.name.common}`;
        displayCapital.innerText = `Capital: ${country.capital}`;
        displayLanguages.innerText = `Native Language(s): ${newLanguages}`;
        displayFlag.textContent =  `${country.flag}`;
    })}