"use strict";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

let map;
let mapEvent;

function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;

        const coords = { lat: latitude, lng: longitude };

        map = new google.maps.Map(document.getElementById("map"), {
          center: coords,
          zoom: 13,
          mapId: "MAP_ID",
        });

        // Handling clicks on map
        google.maps.event.addListener(map, "click", function (event) {
          mapEvent = event;
          form.classList.remove("hidden");
          inputDistance.focus();
        });
      },
      function () {
        alert("Could not get your position");
      }
    );
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Clear input fields
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      "";

  // Display marker
  const marker = new google.maps.marker.AdvancedMarkerElement({
    position: mapEvent.latLng,
    map: map,
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `
          <div class="info-window-content running-window-content">
            Workout
          </div>`,
  });

  infoWindow.open(map, marker);

  google.maps.event.addListener(infoWindow, "domready", function () {
    const iwOuter = document.querySelector(".gm-style-iw");
    const hasInfoWindowContent = iwOuter?.querySelector(".info-window-content");

    if (hasInfoWindowContent) {
      iwOuter.classList.add("workout");
      const iwContainer = iwOuter.closest(".gm-style");
      if (iwContainer) {
        iwContainer.classList.add("workout");
      }
    }
  });
});

inputType.addEventListener("change", function () {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});
