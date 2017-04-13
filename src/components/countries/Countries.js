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
import DisplayPages from './displayPages/DisplayPages';



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
    componentWillReceiveProps() {
        this.renderTable();
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
            this.setState({countriesRendered})
        }
    }

    render() {
        return (
            <div className="countries">
                <h2>Countries</h2>
                    <table className="table table-striped table-bordered">
                        <tbody>
                        <tr>
                            <th>Number</th>
                            <th>Country name</th>
                        </tr>
                        {this.state.countriesRendered}
                        </tbody>
                    </table>
                <DisplayPages
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