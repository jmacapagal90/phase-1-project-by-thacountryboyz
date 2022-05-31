const baseURL = "http://localhost:3000/countries";
const countryList = document.getElementById("list");
let idCounter = 1;
let currentId = 1;

document.addEventListener("DOMContentLoaded", () => {
    //this will contain all our initilization functions -> setting up event listeners for form, buttons, etc.
    initCountries();
})

//new function to initialize flags (countrys)
function initCountries() {
    fetch(baseURL)
    .then(resp => resp.json())
    .then(countries => {
       addCountries(countries);
    })
}

function initForm() {
    voteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        //form will take user input to show the countries that meet the criteria
        //probably need to add dropdown to show how we're searching for countries (population, area, landlocked, etc)
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
        //console.log(country.name.common);
        //console.log(country.flag);
        p.textContent = "[\ud83c][\udde6][\ud83c][\uddfc]"; 
        //p.textContent = `${country.flag}`; 
        p.id = idCounter;
        div.id = idCounter;
        card.appendChild(p);
        card.appendChild(div);
        countryList.appendChild(card);

        // div.addEventListener('click', (e)=> {
        //     displayCountry(e.target.id)
        // })
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
}



