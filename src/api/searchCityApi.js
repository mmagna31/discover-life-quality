/* with fetch */
// async function searchCityApi(cityname) {
//   const url = new URL(
//     `https://api.teleport.org/api/cities/?search=${cityname}`
//   );

//   console.log(url);
//   try {
//     const response = await fetch(url, {
//       headers: {
//         Accept: "application/vnd.teleport.v1+json",
//       },
//     });

//     const citiesList = await response.json();
//     console.log(JSON.stringify(citiesList));
//     return citiesList;
//   } catch (err) {
//     console.log("Error:", err);
//   }
// }

const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://api.teleport.org/api/",
  timeout: 3000,
  headers: { Accept: "application/vnd.teleport.v1+json" },
});

async function searchCityApi(cityname) {
  try {
    const response = await axiosInstance.get(`/cities/?search=${cityname}`);
    // need to filter response
    return response;
  } catch (err) {
    console.log("Error:", err);
  }
}

export default searchCityApi;
