const baseURL = "";

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
        for (let country of countries) {
            addCountry(country);
        }
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
function addCountries(country) {
    let div = document.createElement('div');
    div.textContent = char.name;
    //.appendChild(div); 
    span.id = idCounter;
    span.addEventListener('click', (e)=> {
        displayCountry(e.target.id)
    })
    idCounter++;
}

function displayCountry(id) {
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



