import "babel-polyfill";
import {put, takeEvery, call, select} from 'redux-saga/effects'
import axios from 'axios';


export function* getRegions(action) {
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
    // only call api if not called before for that page!
    let store = yield select();
    let {fetchedCountries, currentPage} = store.reducerOne;
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