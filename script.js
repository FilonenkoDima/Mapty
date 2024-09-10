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

function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;

        const coords = { lat: latitude, lng: longitude };

        const map = new google.maps.Map(document.getElementById("map"), {
          center: coords,
          zoom: 13,
          mapId: "MAP_ID",
        });

        google.maps.event.addListener(map, "click", function (event) {
          console.log(event);
          placeMarker(event.latLng);
        });

        function placeMarker(location) {
          const marker = new google.maps.marker.AdvancedMarkerElement({
            position: location,
            map: map,
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
          <div class="info-window-content running-window-content">
            Workout
          </div>`,
          });

          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });

          google.maps.event.addListener(infoWindow, "domready", function () {
            const iwOuter = document.querySelector(".gm-style-iw");
            if (iwOuter) iwOuter.classList.add("workout");

            const iwContainer = document.querySelector(".gm-style");
            if (iwContainer) iwContainer.classList.add("workout");
          });
        }
      },
      function () {
        alert("Could not get your position");
      }
    );
  }
}
