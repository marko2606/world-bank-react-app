import React from 'react';
import {connect} from 'react-redux';
import {
    nextPage,
    previousPage,
    setTotalPages,
    getCountries,
    fetchDoneCountries,
    setSpecificPage

} from '../../actions/reducerOneAction';
import Pagination from './displayPages/Pagination';

class Countries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countriesRendered: [],
        };
    }

    componentDidMount() {
        this.props.fetchDoneCountries();
    }

    renderTable() {
        let countriesRendered = [];
        if(this.props.countriesData !== undefined) {
            this.props.countriesData.map((country, index) => {
                if (this.props.mainState.currentPage > 1) {
                    index = ((this.props.mainState.currentPage - 1) * 50) + index;
                }
                countriesRendered.push(
                    <tr key={country.name}>
                        <td>{index + 1}</td>
                        <td>{country.name}</td>
                    </tr>
                )
            });
            return countriesRendered
        }
    }

    render() {
        return (
            <div className="tableContainer">
                <h2>Countries</h2>
                    <table className="table table-striped table-bordered">
                        <tbody>
                        <tr>
                            <th>Number</th>
                            <th>Country name</th>
                        </tr>
                        {this.renderTable()}
                        </tbody>
                    </table>
                <Pagination
                    mainState={this.props.mainState}
                    setTotalPages={this.props.setTotalPages}
                    nextPage={this.props.nextPage}
                    previousPage={this.props.previousPage}
                    fetchDoneCountries={this.props.fetchDoneCountries}
                    setSpecificPage={this.props.setSpecificPage}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        countriesData: state.reducerOne.countries,
        mainState: state.reducerOne
    }
};

export default connect(mapStateToProps, {
    nextPage,
    previousPage,
    setTotalPages,
    getCountries,
    fetchDoneCountries,
    setSpecificPage
})(Countries);