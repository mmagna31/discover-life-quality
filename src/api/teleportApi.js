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
        const cityItem = _.get(value, "_links.city:item.href");
        return new City(fullname, cityItem);
      });
    } catch (err) {
      console.log("Error:", err);
      throw err;
    }
  },
};
