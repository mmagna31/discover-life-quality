import _ from "lodash";
import City from "./teleportCity";

const axios = require("axios");

const teleportApi = {
  instance: axios.create({
    baseURL: "https://api.teleport.org/api/",
    timeout: 3000,
    headers: { Accept: "application/vnd.teleport.v1+json" },
  }),

  async searchCity(cityName) {
    try {
      const response = await this.instance.get(`/cities/?search=${cityName}`);
      const searchResult = _.get(
        response.data,
        "_embedded.city:search-results"
      );

      if (_.isEmpty(searchResult)) return searchResult;

      return _.map(searchResult, (value) => {
        const fullname = _.get(value, "matching_full_name");
        const cityUrl = _.get(value, "_links.city:item.href");
        return new City(fullname, cityUrl);
      });
    } catch (err) {
      console.log("Error:", err);
      throw err;
    }
  },

  async getCityScore(cityName) {
    try {
      const response = await this.instance.get(
        `/urban_areas/slug:${cityName}/scores/`
      );
      return response.data;
    } catch (err) {
      console.log(`getCityScore has failed for cityName: ${cityName}`);
      if (err.response?.status == 404) {
        console.log(`Scores not found for ${cityName} - ${err.message}`);
      }
      throw err;
    }
  },

  async getCityName(geonameid) {
    try {
      const response = await this.instance.get(
        `/cities/geonameid:${geonameid}/`
      );

      return response.data.name;
    } catch (err) {
      throw err;
    }
  },
};

export default teleportApi;
