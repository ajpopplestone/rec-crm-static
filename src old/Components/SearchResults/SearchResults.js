import React, { Component } from 'react';
import './SearchResults.css';
import TableRow from '../TableRow/TableRow'
import TableHeader from '../TableHeader/TableHeader'


class SearchResults extends Component {
    state = {
        candidates: this.props.candidates
    }
    
    
    
    render () {
        let rows = this.state.candidates.map(row => {
            return <TableRow data={row}/>
        });
        
        return (
        <div className="searchResults">
            <table className="tg">
			  <thead>
			    <TableHeader/>
			  </thead>
			  <tbody>
			    {rows}
			  </tbody>
			</table>
        </div>
        )
    }
}

export default SearchResults;