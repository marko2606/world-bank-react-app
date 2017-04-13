import React from 'react';
import {connect} from 'react-redux';
import rootSaga from '../../sagas/saga'
import {fetchDoneRegions} from '../../actions/reducerOneAction';

class Regions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            regionsRendered: [],
        }
    }

    componentWillMount() {
        this.props.fetchDoneRegions();
    }

    componentWillReceiveProps() {
        this.renderTable();
    }

    renderTable() {
        let regionsRendered = [];
        if(this.props.regionsData !== undefined) {
            this.props.regionsData[1].filter((region, index) => {
                if (region.id !== "") {
                    regionsRendered.push(
                        <tr key={region.name}>
                            <td>{index + 1}</td>
                            <td>{region.name}</td>
                        </tr>
                    )
                }
            });
        }
        this.setState({regionsRendered})
    }


    render() {
        return (
            <div>
                <h2>Regions</h2>
                <table className="table table-striped table-bordered">
                    <tbody>
                    <tr>
                        <th>Number</th>
                        <th>Region name</th>
                    </tr>
                    {this.state.regionsRendered}
                    </tbody>
                </table>
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
                type: 'FETCH_DONE_REGIONS_ASYNC',
            })

        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Regions);