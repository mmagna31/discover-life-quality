import _ from "lodash";
import NoInfoAvailableError from "../noInfoError";

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

      if (_.isEmpty(searchResult)) {
        throw new NoInfoAvailableError(`There are no cities for ${cityName}`);
      }

      return searchResult;
    } catch (err) {
      console.log(`searchCity failed for error: ${err.message}`);
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
      if (err.response?.status == 404) {
        console.log(`Scores not found for ${cityName}`);
        throw new NoInfoAvailableError(`No Scores available for ${cityName}`);
      }
      console.log(`getCityScore has failed for cityName: ${cityName}`);
      throw err;
    }
  },

  async getUrbanAreaSlug(geonameid) {
    try {
      const response = await this.instance.get(
        `/cities/geonameid:${geonameid}/`
      );
      let result = _.get(response.data, "_links.city:urban_area.href");
      result = _.replace(result, /.*:(.*)\//, "$1");

      if (!result) {
        throw new NoInfoAvailableError(
          `No slug available for city with geonameid: ${geonameid}`
        );
      }

      return result;
    } catch (err) {
      console.log(`getUrbanAreaSlug failed for ${err.message}`);
      throw err;
    }
  },
};

export default teleportApi;
