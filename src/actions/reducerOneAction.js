export function nextPage() {
    return {
        type: 'NEXT_PAGE'
    }
}

export function previousPage() {
    return {
        type: 'PREVIOUS_PAGE'
    }
}

export function setSpecificPage(selectedPage) {
    return {
        type: 'SET_SPECIFIC_PAGE',
        selectedPage
    }
}

export function setTotalPages(num) {
    return {
        type: 'SET_TOTAL_PAGES',
        payload: num
    }
}

export function getCountries(callback) {
    return {
        type: 'GET_COUNTRIES',
        callback
    }
}

export function fetchDoneRegions() {
    return {
        type: 'FETCH_DONE_REGIONS_ASYNC'
    }
}

export function fetchDoneCountries() {
    return {
        type: 'FETCH_DONE_COUNTRIES_ASYNC',
    }
}
