// modif
const body = document.querySelector("body");
const divSearch = document.createElement("div");
const search = document.createElement("input");
const buttonSeach = document.createElement("button");

search.type = "search";
divSearch.className = "searchListeVols";

buttonSeach.addEventListener("click", function () {
  const selectedCity = search.value;
  console.log(selectedCity);

  // on cherche le code ICAO  des aeroports de la ville selectionnée
});

divSearch.append(search);
divSearch.append(buttonSeach);

body.append(divSearch);
// modif

const divListeVols = document.createElement("select");
const firstOption = document.createElement("option");
divListeVols.appendChild(firstOption);
firstOption.value = "-";
// const divListeVols = document.createElement("div");
const container = document.createElement("div");
const countryVol = document.createElement("div");
const airportInfo = document.createElement("div");

divListeVols.className = "styleListeVols";
countryVol.className = "country";
container.className = "container";

let url =
  "https://opensky-network.org/api/flights/departure?airport=LFPG&begin=";

let date = new Date();

let currentTime = Math.floor(date.getTime() / 1000) - 86400;
let endTime = Math.floor(date.getTime() / 1000) - 80400;

url += currentTime + "&end=" + endTime;
// Liste de departs de Paris CDG
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((vol, index) => {
      let arrival = vol.estArrivalAirport;
      let url2 = "https://airportdb.io/api/v1/airport/";
      url2 +=
        arrival.toString() +
        "?apiToken=65eacd634d3a962e1f14193e000540024c2fd4818d02b281a09cd5000d7c02f1a857bfabf62e595f1ba161b99a7f4059";

      fetch(url2)
        .then((response) => {
          return response.json();
        })
        .then((data2) => {
          let name = data2.name;
          let country = data2.country.name;

          const volElement = document.createElement("option");

          volElement.innerText = name;

          const infoDivListeVols = [];

          // enregistrer la data requis pour le traitement des élements de la liste déroulante
          infoDivListeVols.push(country);
          infoDivListeVols.push(data2.municipality);
          infoDivListeVols.push(data2.latitude_deg);
          infoDivListeVols.push(data2.longitude_deg);
          infoDivListeVols.push(data2.region.name);
          infoDivListeVols.push(data2.home_link);
          infoDivListeVols.push(data2.iso_country);

          volElement.value = infoDivListeVols;

          divListeVols.append(volElement);
          container.append(divListeVols);
          body.append(container);
        });
    });
  })
  .catch(function () {});

const divInfo = document.createElement("div");
divInfo.className = "styleInfoContainer";

divListeVols.addEventListener("change", function () {
  const para1 = document.createElement("p");
  const para2 = document.createElement("p");

  const para3 = document.createElement("p");
  const para4 = document.createElement("a");

  // j'ai ajouté la const en dessous des autre parag
  const imgFlag = document.createElement("img");

  countryVol.innerHTML = "";
  para1.className = "elemCountry";

  // On reécupere la data de l'élement!

  let params = event.target.value.split(",");

  para1.append(document.createTextNode(params[0]));
  countryVol.append(para1);

  /* jai ajouté la suite en dessous du para1 pour afficher le drapeau juste en dessous du pays */
  let flag = params[6];
  imgFlag.src = "https://flagcdn.com/80x60/" + flag.toLowerCase() + ".png";
  countryVol.append(imgFlag);

  para2.className = "elemMunicipality";
  para2.innerText = params[1];
  countryVol.append(para2);

  // et je les ai renseignée
  para3.className = "elemMunicipality";
  para3.innerText = "Region : " + params[4];
  countryVol.append(para3);

  para4.className = "elemMunicipality";
  para4.innerText = "lien : " + params[5];
  para4.href = params[5];
  countryVol.append(para4);

  //ffichage info mètèo

  const divCity = document.createElement("div");
  divCity.className = "styleCity";
  divCity.append(document.createTextNode(params[1]));
  divInfo.innerHTML = "";
  divInfo.append(divCity);

  const APIKey = "599f6dc440cb41b80f9690764858cb10";
  const city = params[1];
  const lat = params[2];
  const lon = params[3];
  // const APICall1 = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`;

  // fetch(APICall1)
  //   .then((response) => response.json())
  //   .then((data) => {
  // const lat = data[0].lat;
  // const lon = data[0].lon;
  const APICall2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;

  fetch(APICall2)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      const divTemperature = document.createElement("div");
      divTemperature.className = "styleTemperature";
      divTemperature.append(document.createTextNode(data.main.temp + " °C"));

      divInfo.append(divTemperature);

      const divHumidité = document.createElement("div");
      divHumidité.className = "styleHumidité";
      divHumidité.append(document.createTextNode(data.main.humidity + " %"));

      divInfo.append(divHumidité);

      const divVent = document.createElement("div");
      divVent.className = "styleVent";
      divVent.append(document.createTextNode(data.wind.speed + " km/h"));
      const wind = document.createElement("img");
      wind.src = "assets/wind-solid.svg";
      divVent.append(wind);

      divInfo.append(divVent);
    });
  // });

  body.append(divInfo);
  //affichage info mètèo

  divListeVols.append(countryVol);
  container.append(countryVol);
});
