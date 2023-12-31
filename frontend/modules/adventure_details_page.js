import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

   const urlParams = new URLSearchParams(search);
   const adventureId = urlParams.get("adventure");
   return adventureId;

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const result = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
    const data =  await result.json();
    return data;
  } catch(e){
    return null;
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // console.log(adventure);
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").textContent = adventure.name;
  document.getElementById("adventure-subtitle").textContent = adventure.subtitle;
  document.getElementById("adventure-content").textContent = adventure.content;

  adventure.images.forEach((image)=>{
    //create element --> setup image --> set image src
    let ele = document.createElement("div");
    ele.className = "col-lg-12";
    ele.innerHTML = `
    <img 
        src=${image}
        alt=""
        srcset=""
        class="activity-card-image pb-3 pb-md-0"
        />
        
        `;
        document.getElementById("photo-gallery").appendChild(ele);
  })

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></li>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></li>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></li>
  </div>
  
   <div class="carousel-inner" id="carousel-inner">

  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

  images.forEach((image,idx)=>{
    let ele = document.createElement("div");
    ele.className = `carousel-item ${idx === 0 ? "active" : ""}`;
    ele.innerHTML = `
    <img 
        src = ${image}
        alt = ""
        srcset = ""
        class = activity-card-image pb-3 pb-md-0"
        />
      `;
      document.getElementById("carousel-inner").appendChild(ele);
    
  });

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
    }  else {
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
    // document.getElementById("reservation-cost").innerText = persons * adventure.costPerHead;

  const reservationCost = document.getElementById("reservation-cost");
  const reservationPerCost = document.getElementById("reservation-person-cost");
  return (reservationCost.innerHTML = persons * adventure.costPerHead);

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const myForm = document.getElementById("myForm");
  myForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = {
      name: myForm.elements["name"].value,
      date: myForm.elements["date"].value,
      person: myForm.elements["person"].value,
      adventure: adventure.id,
    };
    // console.log(formData);
    try {
      const res = await fetch(
        `${config.backendEndpoint}/reservations/new`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await res.json();
        console.log(result);
      if (res.ok) {
        alert("Success!");
        window.location.reload();
      } else {
        let data = await res.json();
        alert(`Failed - ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed - fetch call resulted in an error");
    }
  });
  
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const reservedBanner = document.getElementById("reserved-banner");
  if (adventure.reserved) {
    reservedBanner.style.display = "block";
  } else {
    reservedBanner.style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
