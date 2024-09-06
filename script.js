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

// if (navigator.geolocation)
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       const { latitude } = position.coords;
//       const { longitude } = position.coords;
//       console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

//       const coords = [latitude, longitude];

//       const map = L.map("map").setView(coords, 13);

//       L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map);

//       L.marker(coords)
//         .addTo(map)
//         .bindPopup("A pretty CSS popup.<br> Easily customizable.")
//         .openPopup();
//     },
//     function () {
//       alert("Could not get your position");
//     }
//   );
function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;

        // Вивести координати на Google Maps
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

        const coords = { lat: latitude, lng: longitude };

        // Ініціалізувати карту Google
        const map = new google.maps.Map(document.getElementById("map"), {
          center: coords,
          zoom: 13,
        });

        // Додати маркер на карту
        const marker = new google.maps.Marker({
          position: coords,
          map: map,
        });

        // Додати спливаюче вікно до маркера
        const infoWindow = new google.maps.InfoWindow({
          content: "A pretty CSS popup.<br> Easily customizable.",
        });
        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      },
      function () {
        alert("Could not get your position");
      }
    );
  }
}
