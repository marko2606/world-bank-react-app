import React from 'react';
import {connect} from 'react-redux';
import rootSaga from '../../sagas/saga'
import {fetchDoneRegions} from '../../actions/reducerOneAction';

class Regions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            regionsArr: [],
        }
    }

    componentWillMount() {
        this.props.fetchDoneRegions();
    }

    render() {
        return (
            <div>
                <h2>Regions</h2>
                <ol>{this.props.regionsData === undefined ? 'waiting for data' : this.props.regionsData.data[1].map((region, index) => {
                    if (region.id) {
                        return (<li key={index}>{region.name}</li>)
                    }
                })}</ol>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        regionsData: state.reducerOne.regions
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchDoneRegions: () => {
            dispatch({
                type: 'FETCH_DONE_REGIONS_ASYNC'
            })

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Regions);