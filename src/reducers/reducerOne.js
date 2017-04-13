import {omit} from 'lodash';
import {hashHistory} from 'react-router';

// remember last page
let url = window.location.href;
let lastPage = Number(url[url.length - 1]);
function rememberCurrentPage() {
    if(lastPage) {
        return lastPage
    } else {
        return 1;
    }
}
function numFetchedCountries() {
    let numArr = [];
    if(lastPage) {
        for(let i = 0; i < lastPage; i ++) {
            numArr.push([]);
        }
    }
    return numArr;
}

export function reducerOne(state = {
                               currentPage: rememberCurrentPage(),
                               countriesEnumById: ['XKX'], // kosovo
                               propertiesEnum: ['iso2Code', 'region', 'adminregion', 'incomeLevel', 'lendingType', 'capitalCity', 'longitude', 'latitude'],
                               fetchedCountries: numFetchedCountries(),
                           }, action) {
    switch (action.type) {
        case 'FETCH_DONE_REGIONS':
            state = {
                ...state,
                regions: action.fetchData
            };
            return state;
        case 'FETCH_DONE_COUNTRIES':
            // use only needed properties and add ENUM for countries
            // check if data is available on state
            hashHistory.push('countries/' + state.currentPage)
            if (state.fetchedCountries[state.currentPage - 1].length === 0) {
                let fetchCountries = action.countries.slice();
                let fetchCountriesNeededData = [];
                fetchCountries[1].forEach((country, index) => {
                    let shouldItRender = true;
                    // countries enum here!
                    state.countriesEnumById.forEach((item) => {
                        if (item === country.id) {
                            shouldItRender = false;
                        }
                    });
                    if (shouldItRender) {
                        // delete unwanted properties
                        country.regionId = country.region.id;
                        country = _.omit(country, state.propertiesEnum);
                        fetchCountriesNeededData.push(country);
                    } else {
                        return false;
                    }
                });
                // add already loaded pages to state
                let fetchedCountries = state.fetchedCountries.slice();
                fetchedCountries[state.currentPage - 1] = fetchCountriesNeededData;

                state = {
                    ...state,
                    countries: fetchCountriesNeededData,
                    fetchedCountries,
                };
                return state;
            } else {
                state = {
                    ...state,
                    countries: state.fetchedCountries[state.currentPage - 1],

                };
                return state;
            }
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