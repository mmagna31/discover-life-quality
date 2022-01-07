import _ from "lodash";
import axiosInstance from "./instanceApi.js";

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
