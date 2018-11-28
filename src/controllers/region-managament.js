import {
    sendResponse,
    SendMail
} from './functions';
import ReigonApi from 'country-state-city';
import Constants from './constant';

async function getCountries(req, res) {
    let countries = ReigonApi.getAllCountries();
    console.log(countries);
    sendResponse(res, 200, 'Successfully.', countries);

}

async function getCountriesByState(req, res) {
    console.log(req);
    let country = req.query.id;
    let states = ReigonApi.getStatesOfCountry(country);
    console.log(states);
    sendResponse(res, 200, 'Successfully.', states);

}

async function getCitiesOfState(req, res) {
    console.log(req);
    let state = req.query.id;
    let cities = ReigonApi.getCitiesOfState(state);
    console.log(cities);
    sendResponse(res, 200, 'Successfully.', cities);
}
module.exports = {
    getCountries,
    getCountriesByState,
    getCitiesOfState
};