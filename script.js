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

class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your position");
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = { lat: latitude, lng: longitude };

    this.#map = new google.maps.Map(document.getElementById("map"), {
      center: coords,
      zoom: 13,
      mapId: "MAP_ID",
    });

    // Handling clicks on map
    google.maps.event.addListener(
      this.#map,
      "click",
      this._showForm.bind(this)
    );
  }

  _showForm(event) {
    this.#mapEvent = event;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    e.preventDefault();

    // Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";

    // Display marker
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: this.#mapEvent.latLng,
      map: this.#map,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
          <div class="info-window-content running-window-content">
            Workout
          </div>`,
    });

    infoWindow.open(this.#map, marker);

    google.maps.event.addListener(infoWindow, "domready", function () {
      const iwOuter = document.querySelector(".gm-style-iw");
      const hasInfoWindowContent = iwOuter?.querySelector(
        ".info-window-content"
      );

      if (hasInfoWindowContent) {
        iwOuter.classList.add("workout");
        const iwContainer = iwOuter.closest(".gm-style");
        if (iwContainer) {
          iwContainer.classList.add("workout");
        }
      }
    });
  }
}

function initMap() {
  new App();
}
