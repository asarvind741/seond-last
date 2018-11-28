import RegionController from '../controllers/region-managament';
module.exports = app => {
    let region = '/region/';
    console.log('test');
    app.get(`${region}countries`, RegionController.getCountries);
    app.get(`${region}states`, RegionController.getCountriesByState);
    app.get(`${region}cities`, RegionController.getCitiesOfState);

};