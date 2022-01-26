import _ from "lodash";

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

      return searchResult;
    } catch (err) {
      console.log("Error:", err);
      throw err;
    }
  },

  async getCityScores(cityName) {
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

  async getUrbanAreaSlugName(geonameid) {
    try {
      const response = await this.instance.get(
        `/cities/geonameid:${geonameid}/`
      );
      let result = _.get(response.data, "_links.city:urban_area.href");
      result = _.replace(result, /.*:(.*)\//, "$1");

      if (!result)
        throw Error(
          `City Urban Area is not present for geonameid ${geonameid}`
        );

      return result;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  },
};

export default teleportApi;
