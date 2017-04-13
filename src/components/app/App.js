import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';


class App extends React.Component {
    render() {
        return (
            <div>
                <h1>World React App</h1>
                <Link to="/regions">
                    <Button className="btn btn-primary" type="button">Regions</Button>
                </Link>
                <br/>
                <br/>
                <Link to={"/countries/" + this.props.reducerOne.currentPage} >
                    <Button className="btn btn-primary" type="button">Countries</Button></Link>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(window.location.href);
    return {
        reducerOne: state.reducerOne
    };
};


export default connect(mapStateToProps, null)(App);