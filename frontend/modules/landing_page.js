import config from "../conf/index.js";

async function init() {
<<<<<<< HEAD
  // Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log("cities", cities);

  // Updates the DOM with the cities
  if (cities) {
    cities.forEach(({id,city, description, image}) => {
      addCityToDOM(id,city, description, image);
=======
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
>>>>>>> 16382e4617585130deb7edc54724de64ac60a88a
    });
  }
}

<<<<<<< HEAD
// Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const result = await fetch(config.backendEndpoint + "/cities");
    console.log('here')
    const data = await result.json();

    return data;
  } catch (e) {
    return null;
  }
}

// Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM     
  let ele = document.createElement("div");
  ele.className = "col-6 col-lg-3 mb-4"
  ele.innerHTML = `
  <a href="pages/adventures/?city=${id}" id="${id}">
  <div class="tile"> 
  <div class="tile-text text-center">
  <h5> ${city} </h5>
  <p> ${description} </p>
  </div>
  <img class="img-responsive" src="${image}"/>  </div>
  </a>
  `;
  document.getElementById("data").appendChild(ele);
=======
//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

>>>>>>> 16382e4617585130deb7edc54724de64ac60a88a
}

export { init, fetchCities, addCityToDOM };
