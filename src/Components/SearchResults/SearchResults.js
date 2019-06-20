import React, { Component } from 'react';
import './SearchResults.css';
import TableRow from '../TableRow/TableRow'
import TableHeader from '../TableHeader/TableHeader'


class SearchResults extends Component {

    render () {
        let columns = []
        for (var column in this.props.columns) {
            if (this.props.columns[column]) {
                columns.push(column)
            }
        }
        
        let rows = this.props.results.map(row => {
            return <TableRow 
                        data={row} 
                        key={row.UID} 
                        openMap={this.props.openMap} 
                        open={this.props.open}
                        columnsSelected={this.props.columns}/>
        });


        return (
        <div className="searchResults">
            <table className="tg">
			  <thead>
			    <TableHeader 
			        columns={columns} 
			        sort={this.props.sort} 
			        sortBy={this.props.sortBy} 
			        sortAssending={this.props.sortAssending}
			        workbench={this.props.workbench}/>
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
