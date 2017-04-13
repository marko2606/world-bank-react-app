import React from 'react';
import FontAwesome from 'react-fontawesome';

const styles = {
    paginationStyles: {
        onClick: () => {
            this.props.setSpecificPage(this.props.mainState.pagesTotal);
            this.props.fetchDoneCountries();
        }
    }
};

class DisplayPages extends React.Component {
    constructor() {
        super();
        this.state = {
            pageSelector: []
        }
    }

    componentWillReceiveProps() {
        this.pageNumbersDisplay();
    }

    pageNumbersDisplay() {
        let {pagesTotal, currentPage} = this.props.mainState;
        let pageSelector = [<span key="currentPage"
                                  style={{color: 'red'}}
                                  className="paginationNumber"
        >{currentPage}</span>];
        switch (currentPage) {
            case 1:
                pageSelector.push(<span key="nextPage"
                                        onClick={() => {
                                            this.props.nextPage();
                                            this.props.fetchDoneCountries();
                                        }}
                                        className="paginationNumber"
                    >{currentPage + 1}</span>,
                    <span key="nextPage2"
                          onClick={() => {
                              this.props.nextPage();
                              this.props.nextPage();
                              this.props.fetchDoneCountries();
                          }}
                          className="paginationNumber"
                    >{currentPage + 2}</span>);
                break;
            case pagesTotal:
                pageSelector.unshift(<span key="previousPage"
                                           onClick={() => {
                                               this.props.previousPage();
                                               this.props.fetchDoneCountries();
                                           }}
                                           className="paginationNumber"
                    >{currentPage - 1}</span>,
                    <span key="previousPage2"
                          onClick={() => {
                              this.props.previousPage();
                              this.props.previousPage();
                              this.props.fetchDoneCountries();
                          }}
                          className="paginationNumber"
                    >{currentPage - 2}</span>);
                break;
            default:
                pageSelector.push(<span key="nextPage"
                                        onClick={() => {
                                            this.props.nextPage();
                                            this.props.fetchDoneCountries();
                                        }}
                                        className="paginationNumber"
                >{currentPage + 1}</span>);
                pageSelector.unshift(<span key="previousPage"
                                           onClick={() => {
                                               this.props.previousPage();
                                               this.props.fetchDoneCountries();
                                           }}
                                           className="paginationNumber"
                >{currentPage - 1}</span>);
                break;

        }
        this.setState({pageSelector});
    }

    render() {
        console.log(this.props)
        return (
            <div className="centerDiv">
                <div>
                    <FontAwesome
                        onClick={() => {
                            this.props.setSpecificPage(1);
                            this.props.fetchDoneCountries();
                        }}
                        className="pagination fa fa-fast-backward"
                        name="backwardFull"
                    />
                    <FontAwesome
                        className="pagination fa fa-backward"
                        name="backward"
                        onClick={() => {
                            this.props.previousPage();
                            this.props.fetchDoneCountries()
                        }}
                    />
                    {this.state.pageSelector}
                    <FontAwesome
                        className="pagination fa fa-forward"
                        name="forward"
                        onClick={() => {
                            this.props.nextPage();
                            this.props.fetchDoneCountries();
                        }}
                    />
                    <FontAwesome
                        className="pagination fa fa-fast-forward"
                        name="forwardFull"
                        onClick={() => {
                            this.props.setSpecificPage(this.props.mainState.pagesTotal);
                            this.props.fetchDoneCountries();
                        }}
                    />
                </div>
            </div>

        )
    }
}


export default DisplayPages;