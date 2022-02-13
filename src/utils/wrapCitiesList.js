function wrapCitiesList(citiesList) {
  return _.map(citiesList, (value) => {
    let geonameid = _.get(value, "_links.city:item.href");
    // return only geonameid number from href teleport
    geonameid = _.replace(geonameid, /.*:(\d*).*/, "$1");
    let name = _.get(value, "matching_full_name");
    /* removing duplicated name in string */
    name = Array.from(new Set(_.split(name, ", "))).join(", ");
    return {
      geonameid: geonameid,
      name: name,
    };
  });
}

export default wrapCitiesList;
