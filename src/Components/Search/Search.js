import React, { Component } from 'react';
import './Search.css';
import Candidate from '../Candidate/Candidate'
import Client from '../Client/Client'
import SearchResults from '../SearchResults/SearchResults'
import CandSearchHeader from '../CandSearchHeader/CandSearchHeader'
import ClientSearchHeader from '../ClientSearchHeader/ClientSearchHeader'
import ColumnSelect from '../ColumnSelect/ColumnSelect'


class Search extends Component {
    state = {
        searchTerms: this.props.defaultSearchTerms,
        sortAssending: false,
        sortBy: {
            candidate: 'UID',
            client: 'UID'
        },
        locationURL: {
            candidate: '',
            client: ''
        },
        open: {
            candidate: '',
            client: ''
        },
        location: {
            candidate: {
                lat: '',
                long: ''
            },
            client: {
                lat: '',
                long: ''
            }
        },
        columnSelect: false,
        columnDisplay: {
            candidate: {
                UID: true,
                forename: true,
                surname: true,
                status: true,
                email: true,
                telephone: true,
                consultant: true,
                roleCode: true,
                address: true,
                postcode: true,
                lat: false,
                long: false,
                distance: false
            },
            client: {
                UID: true,
                name: true,
                status: true,
                email: true,
                website: true,
                telephone: true,
                consultant: true,
                businessType: true,
                address: true,
                postcode: true,
                lat: false,
                long: false,
                distance: false
            }
        }
    }
    
    
    termsChangeHandler = (value, type) => {
        let newTerms = {...this.state.searchTerms}
        newTerms[this.props.workbench][type] = value
        this.setState({searchTerms: newTerms})
    }
    
    sortChangeHandler = (value) => {
        let sortBy = {...this.state.sortBy}
        if(sortBy[this.props.workbench] === value) {
            this.setState({sortAssending: !this.state.sortAssending})
        } else {
            sortBy[this.props.workbench] = value
            this.setState({sortAssending: false, sortBy: sortBy})
        }
    }
    
    locationChangeHandler = (event) => {
        let locationURL = {...this.state.locationURL}
        locationURL[this.props.workbench] = event.target.value
        this.setState({locationURL: locationURL})
    }
    
    
    openHandler = (UID) => {
        let open = {...this.state.open}
        open[this.props.workbench] = UID
        this.setState({open: open})
    } 
    
    openMap = (postcode) => {
        if(postcode){
            var win = window.open(`https://maps.google.co.uk/maps?q=${postcode}`, '_blank');
            win.focus();
        }
    }
    
    applyLatLong = () => {
        let url = this.state.locationURL[this.props.workbench];
        let regex = new RegExp('@(.*),(.*),')
        let lat = ''
        let long = ''
        if (url.match(regex)) {
            var latLongMatch = url.match(regex)
            lat = latLongMatch[1]
            long = latLongMatch[2]
        }
        let location = {...this.state.location}
        location[this.props.workbench].lat = lat
        location[this.props.workbench].long = long
        
        this.setState({location: location})
        
    }
    
    applyRadiusSearch = () => {
        this.applyLatLong();
        let lat = this.state.location[this.props.workbench].lat
        let long = this.state.location[this.props.workbench].long
        this.props.applyPostcode(lat, long)
        
        let searchTerms = {...this.state.searchTerms}
        searchTerms[this.props.workbench].postcode = ''
        
        let columnDisplay = {...this.state.columnDisplay}
        if (this.state.location[this.props.workbench].lat && this.state.location[this.props.workbench].long) {
            columnDisplay[this.props.workbench].distance = true
        } else {
            columnDisplay[this.props.workbench].distance = false
        }
        
        let sortBy = {...this.state.sortBy}
        sortBy[this.props.workbench] = 'distance'
        this.setState({searchTerms: searchTerms, columnDisplay: columnDisplay, sortBy: sortBy, sortAssending: false})
    }
    
    // applyPostcodeHandler = () => {
    //     this.props.applyPostcode(this.state.locationURL[this.props.workbench])
    //     let searchTerms = {...this.state.searchTerms}
    //     let columnDisplay = {...this.state.columnDisplay}
    //     let sortBy = {...this.state.sortBy}
    //     searchTerms[this.props.workbench].postcode = ''
    //     if (this.state.locationURL[this.props.workbench]) {
    //         columnDisplay[this.props.workbench].distance = true
    //     } else {
    //         columnDisplay[this.props.workbench].distance = false
    //     }
    //     sortBy[this.props.workbench] = 'distance'
    //     this.setState({searchTerms: searchTerms, columnDisplay: columnDisplay, sortBy: sortBy, sortAssending: false})
    // }
    
    applyPostcodeAfterSearch = () => {
        let lat = this.state.location[this.props.workbench].lat
        let long = this.state.location[this.props.workbench].long
        if(lat && long) {
            this.props.applyPostcode(lat, long)
        }
    }
    
    clearSearch = () => {
        let searchTerms = {...this.state.searchTerms};
        for (var term in searchTerms[this.props.workbench]) {
            if (term === 'radius') {
                searchTerms[this.props.workbench][term] = 50;
            } else {
                searchTerms[this.props.workbench][term] = '';
            }
        }
        let locationURL = {...this.state.locationURL};
        locationURL[this.props.workbench] = ''
        let columnDisplay = {...this.state.columnDisplay};
        columnDisplay[this.props.workbench].distance = false; 
        this.setState({searchTerms: searchTerms, locationURL: locationURL, columnDisplay: columnDisplay})
        this.props.applyPostcode('')
    }
    
    handleChangeColumnsDisplay = (value) => {
        this.setState({columnSelect: value})
    }
    
    handleChangeColumns = (set) => {
        let columnDisplay = {...this.state.columnDisplay}
        for (var column in columnDisplay[this.props.workbench]) {
            if(set.has(column)) {
                columnDisplay[this.props.workbench][column] = true
            } else {
                columnDisplay[this.props.workbench][column] = false
            }
        }
        this.setState({columnDisplay: columnDisplay, columnSelect: false})
    }
    
    
    search = (searchTerms, records, location) => {
            const searchColumns = Object.keys(searchTerms);
            const results = records.filter(function(record){
                let found = true
                for (var term of searchColumns){
                    switch (term) {
                        case 'radius':
                            if ((location.lat !== '' && location.long !== '' && record.distance === '') || record.distance > searchTerms.radius) {
                                found = false;
                            }
                            break;
                        case 'email':
                            let emailExpression = new RegExp(searchTerms[term], 'i');
                            if (!record[term].match(emailExpression) ){
                                found = false;
                            }
                            break;
                        case 'website':
                            let webExpression = new RegExp(searchTerms[term], 'i')
                            if (!record[term].match(webExpression) ){
                                found = false
                            }
                            break;
                        default:
                            let searchExpression = new RegExp('^' + searchTerms[term], 'i')
                            if (!record[term].match(searchExpression) ){
                                found = false
                            }
                        } 
                    }
                    
                return found;
            })
            
            return results;
        }
    
    
    sort = (arr, sortBy, sortAssending) => {
          let compare = function (a, b) {
              // Use toUpperCase() to ignore character casing
              const sortA = typeof a[sortBy] === 'number' ? a[sortBy] : a[sortBy].toUpperCase();
              const sortB = typeof b[sortBy] === 'number' ? b[sortBy] : b[sortBy].toUpperCase();
    
              let comparison = 0;
              if (sortA > sortB) {
                comparison = 1;
              } else if (sortA < sortB) {
                comparison = -1;
              }
              if(!sortAssending){
                return comparison;
              } else {
                return comparison * -1;
              }
    
            }
            
            arr.sort(compare)
            return arr;

    }
    
  
    render () {
        let results = this.search(this.state.searchTerms[this.props.workbench], this.props.data, this.state.location[this.props.workbench])
        let sorted = this.sort(results, this.state.sortBy[this.props.workbench], this.state.sortAssending)
   
        let display = null
        
        const searchResults = (<SearchResults 
                                columns={this.state.columnDisplay[this.props.workbench]}
                                results={sorted}
                                sort={this.sortChangeHandler}
                                sortBy={this.state.sortBy[this.props.workbench]}
                                sortAssending={this.state.sortAssending}
                                workbench={this.props.workbench}
                                openMap={this.openMap}
                                open={this.openHandler}
                                />)
        
        
        switch(this.props.workbench){
            case 'home':
                display = null
            break;
            case 'candidate':
                display = (
                    <div>
                        <CandSearchHeader 
                            termsChanged={this.termsChangeHandler}
                            searchTerms={this.state.searchTerms[this.props.workbench]}
                            locationChange={this.locationChangeHandler}
                            locationURL={this.state.locationURL[this.props.workbench]}
                            applyPostcode={this.applyRadiusSearch}
                            newCand={this.openHandler}
                            clearSearch={this.clearSearch}
                            length={results.length}
                            changeColumns={this.handleChangeColumnsDisplay}
                            location={this.state.location[this.props.workbench]}/>
                        {searchResults}
                    </div>
                )
            break;
            case 'client':
                display = (
                    <div>
                        <ClientSearchHeader 
                            termsChanged={this.termsChangeHandler}
                            searchTerms={this.state.searchTerms[this.props.workbench]}
                            locationChange={this.locationChangeHandler}
                            locationURL={this.state.locationURL[this.props.workbench]}
                            applyPostcode={this.applyRadiusSearch}
                            newClient={this.openHandler}
                            clearSearch={this.clearSearch}
                            length={results.length}
                            changeColumns={this.handleChangeColumnsDisplay}
                            location={this.state.location[this.props.workbench]}/>
                        {searchResults}
                    </div>
                )
                break;
            default:
                display = null
                
        }
        
        if (this.state.open[this.props.workbench]) {
            let record = {};
            if(this.state.open[this.props.workbench] === 'new') {
                for(var key in this.props.data[0]) {
                    record[key] = '';
                }
                
          
            } else {
                record = this.props.data.filter(record => {
                    return record.UID === this.state.open[this.props.workbench]
                })[0]
            }
            
            switch(this.props.workbench) {
                case 'candidate':
                    display = <Candidate 
                                candidate={record} 
                                open={this.openHandler}
                                updateRadius={this.applyPostcodeAfterSearch}
                                update={this.props.update}/>
                break;
                case 'client':
                    display = <Client 
                                client={record} 
                                open={this.openHandler}
                                updateRadius={this.applyPostcodeAfterSearch}
                                update={this.props.update}/>
                break;
                default:
                    console.log("Record unavailable")
            }
        }
        
        let columnSelect = null
        if (this.state.columnSelect){
            columnSelect = (
                <div>
                    <ColumnSelect 
                        close={this.handleChangeColumnsDisplay}
                        columns={this.state.columnDisplay[this.props.workbench]}
                        updateColumns={this.handleChangeColumns}
                        workbench={this.props.workbench}/>
                    <div className="overlay"></div>
                </div>
            )
        }
        
        return (
        <div className={(this.state.columnSelect[this.props.workbench] ? "noClick" : "")}>
            {display}
            {columnSelect}
        </div>
        )
    }
}

export default Search;