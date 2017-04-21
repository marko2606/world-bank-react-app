import {omit} from 'lodash';

// remember last page
let url = window.location.href;
let lastPage = Number(url[url.length - 1]);
function rememberCurrentPage() {
    if (lastPage) {
        return lastPage
    } else {
        return 1;
    }
}
function numFetchedCountries() {
    let numArr = [];
    if (lastPage) {
        for (let i = 0; i < lastPage; i++) {
            numArr.push([]);
        }
    } else {
        return [[]];
    }
    return numArr;
}

function shouldCountryRender(country) {
    return this.countriesEnumById.filter((item) => {
        if (item === country.id) {
            return false;
        }
        return country;
    });
}

function sortCountryData(country) {
    country.regionId = country.region.id;
    return country = _.omit(country, this.propertiesEnum);
}

export function reducerOne(state = {
    countries: [], // currently displayed countries
    currentPage: rememberCurrentPage(),
    countriesEnumById: ['XKX'], // countries to delete -  kosovo
    propertiesEnum: ['iso2Code', 'region', 'adminregion', 'incomeLevel', 'lendingType', 'capitalCity', 'longitude', 'latitude'], // properties to delete
    fetchedCountries: numFetchedCountries(), // fetched countries
}, action) {

    switch (action.type) {

        case 'FETCH_DONE_REGIONS':
            state = {
                ...state,
                regions: action.fetchData
            };
            return state;

        case 'FETCH_DONE_COUNTRIES':
            let countries = state.fetchedCountries[state.currentPage - 1];
            let fetchedCountries = state.fetchedCountries.slice();
            countries = action.countries.filter(shouldCountryRender, state);
            countries = countries.map(sortCountryData, state);
            fetchedCountries[state.currentPage - 1] = countries;
            state = {
                ...state,
                countries,
                fetchedCountries
            };
            return state;

        case 'DISPLAY_FETCHED_COUNTRIES':
            state = {
                ...state,
                countries: state.fetchedCountries[state.currentPage - 1]
            };
            return state;

        case 'PREVIOUS_PAGE':
            state = {
                ...state,
                currentPage: state.currentPage - 1 === 0 ? 1 : state.currentPage - 1
            };
            return state;

        case 'NEXT_PAGE':
            state = {
                ...state,
                currentPage: state.currentPage + 1 > state.pagesTotal ? state.currentPage : state.currentPage + 1
            };
            return state;

        case 'SET_SPECIFIC_PAGE':
            state = {
                ...state,
                currentPage: action.selectedPage
            };
            return state;

        case 'SET_TOTAL_PAGES':
            if (state.pagesTotal === undefined) {
                let fetchedCountries = []; // prepare storage for future countries data CHECK TO SEE IF YOU REALLY NEED IT?
                for (let i = 0; i < action.pagesTotal; i++) {
                    fetchedCountries.push([]);
                }
                state = {
                    ...state,
                    pagesTotal: action.pagesTotal,
                    fetchedCountries
                };
            }
            return state;
    }
    return state;
}