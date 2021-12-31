// class SearchCityApi {
//   constructor() {
//     this.baseUrl = new URL("https://api.teleport.org/api");
//     this.citiesList = [];
//   }

//   findCity(cityname) {}
// }

async function searchCityApi(cityname) {
  const url = new URL(
    `https://api.teleport.org/api/cities/?search=${cityname}`
  );

  console.log(url);
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.teleport.v1+json",
        Origin: "http://test.com",
      },
    });

    const citiesList = await response.json();
    /////////////////////////////////////////////////////////
    return citiesList;
  } catch (err) {
    console.log("errore");
  }
}

export default searchCityApi;
