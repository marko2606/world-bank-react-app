import "babel-polyfill";
import {put, takeEvery, call, select} from 'redux-saga/effects'
import axios from 'axios';
import {hashHistory} from 'react-router';


export function* getRegions() {
    try {
        const response = yield call(axios.get, 'http://api.worldbank.org/regions?format=json');
        yield put({type: 'FETCH_DONE_REGIONS', fetchData: response.data});
    } catch (e) {
        console.log(e)
    }
}

export function* watchGetRegions() {
    yield takeEvery('FETCH_DONE_REGIONS_ASYNC', getRegions)
}

export function* getCountries() {
    let store = yield select();
    let {fetchedCountries, currentPage} = store.reducerOne;
    hashHistory.push('countries/' + currentPage);
    try {
        //should Call Api if no data available for current page on store
        if (fetchedCountries[currentPage - 1].length === 0) {
            const response = yield call(axios.get, 'http://api.worldbank.org/countries/all?format=json&' + 'page=' + currentPage);
            yield put({type: 'SET_TOTAL_PAGES', pagesTotal: response.data[0].pages});
            yield put({type: 'FETCH_DONE_COUNTRIES', countries: response.data[1]});
        } else {
            yield put({type: 'DISPLAY_FETCHED_COUNTRIES'});
        }
    } catch (e) {
        console.log(e.message)
    }
}

export function* watchGetCountries() {
    yield takeEvery('FETCH_DONE_COUNTRIES_ASYNC', getCountries)
}

export default function* rootSaga() {
    yield [
        watchGetRegions(),
        watchGetCountries()
    ]
}