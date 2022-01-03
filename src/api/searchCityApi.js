/* with fetch */
// async function searchCityApi(cityname) {
//   const url = new URL(
//     `https://api.teleport.org/api/cities/?search=${cityname}`
//   );

import _ from "lodash";

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
    const searchResult = _.get(response.data, "_embedded.city:search-results");

    if (_.isEmpty(searchResult)) return searchResult;

    const citiesList = _.map(searchResult, (value) => {
      return {
        href: _.get(value, "_links.city:item.href"),
        fullname: _.get(value, "matching_full_name"),
      };
    });

    return citiesList;
  } catch (err) {
    console.log("Error:", err);
    throw err;
  }
}

export default searchCityApi;
