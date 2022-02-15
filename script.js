window.addEventListener("load", () => {
  let lat;
  let lon;
  const key = "6fb42bdeee5a6fe88f72bda6da6b0400";
  const temperatureDegree = document.querySelector(".degree");
  const description = document.querySelector(".summary");
  const cityCountry = document.querySelector(".location");
  const iconDom = document.querySelector(".icons");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;

      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          temperatureDegree.textContent = Math.round(data.main.temp);
          description.textContent = data.weather[0].main;
          cityCountry.textContent = `${data.name}, ${data.sys.country}`;
          const addImage = () => {
            const iconImage = document.createElement("img");
            iconImage.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            iconImage.alt = `${data.weather[0].description}`;
            iconDom.appendChild(iconImage);
          };
          addImage();
        });
    });
  } else {
    alert("To view the weather, you must allow location services.");
  }
});
