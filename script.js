// const divListVols = document.createElement("select");
const divListeVols = document.createElement("div");
const container = document.createElement("div");
const body = document.querySelector("body");
const countryVol = document.createElement("div");
const airportInfo = document.createElement("div");

divListeVols.className = "listeVols";
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
    // console.log(data);

    // pour chaque vol on rfécupere les ICAO  des aéroports d'arrivée
    data.forEach((vol, index) => {
      let arrival = vol.estArrivalAirport;
      // console.log(index);
      // console.log(data);

      let url2 = "https://airportdb.io/api/v1/airport/";
      url2 +=
        arrival.toString() +
        "?apiToken=65eacd634d3a962e1f14193e000540024c2fd4818d02b281a09cd5000d7c02f1a857bfabf62e595f1ba161b99a7f4059";
      // console.log(url2);
      fetch(url2)
        .then((response) => {
          return response.json();
        })
        .then((data2) => {
          let name = data2.name;
          let country = data2.country.name;

          console.log(name);
          // const volElement = document.createElement("option");
          const volElement = document.createElement("div");
          volElement.className = "volCarte";

          // volElement.innerText = name;
          volElement.innerHTML = name;
          volElement.addEventListener("click", function () {
            countryVol.innerHTML = "";
            const para1 = document.createElement("p");
            const para2 = document.createElement("p");
            para1.className = "elemCountry";
            para1.innerText = country;
            countryVol.append(para1);

            para2.className = "elemMunicipality";
            para2.innerText = data2.municipality;
            countryVol.append(para2);

            divListeVols.append(countryVol);
            container.append(countryVol);
          });
          divListeVols.append(volElement);
        });
    });
  })
  .catch(function () {});

container.append(divListeVols);
body.append(container);
