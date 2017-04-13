import "babel-polyfill";
import {put, takeEvery, call} from 'redux-saga/effects'
import axios from 'axios';
import {store} from '../store/store';
import {hashHistory} from 'react-router';


export function* getRegions() {
    try {
        const response = yield call(axios.get, 'http://api.worldbank.org/regions?format=json');
        yield put({type: 'FETCH_DONE_REGIONS', fetchData: response});
    } catch (e) {
        console.log(e)
    }
}

export function* watchGetRegions() {
    yield takeEvery('FETCH_DONE_REGIONS_ASYNC', getRegions)
}

export function* getCountries() {
    // only call api if not called before for that page!
    let {fetchedCountries, currentPage} = store.getState().reducerOne; // continue . . .
    try {
        //should Call Api
        if (fetchedCountries[currentPage - 1].length === 0) {
            const response = yield call(axios.get, 'http://api.worldbank.org/countries/all?format=json&' + 'page=' + currentPage);
            yield put({type: 'SET_TOTAL_PAGES', pagesTotal: response.data[0].pages});
            yield put({type: 'FETCH_DONE_COUNTRIES', countries: response.data});
        }
        yield put({type: 'FETCH_DONE_COUNTRIES'});
    } catch (e) {
        console.log(e)
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