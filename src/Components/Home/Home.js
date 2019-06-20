import React from 'react';
import './Home.css';


const Home = ( props ) => {
    return (
     <div className="home">
        <h1>Features</h1>
        <ul>
            <li>Login screen, passwords protected by simple hash function</li>
            <li>Candidate and Client workbench search</li>
            <li>Search results instantly update</li>
            <li>Google maps can be opened with the search postcode by clicking "Open Map With Postcode"</li>
            <li>Google maps URL with Lat/Long can be added to search</li>
            <li>Clicking Apply postcode will strip lat/long from URL and calculate distance from each record to the search URL</li>
            <li>Postcode of each record can be opened in Google maps by clicking postcode in search grid</li>
            <li>Columns can be ordered by clicking the column header</li>
            <li>Displayed columns can be edited by clicking "Change Columns"</li>
            <li>Record can be opened by clicking on record in table row</li>
            <li>Record can be edited and saved back</li>
            <li>New record can be created and saved</li>
            <li>Search terms will be retained in search when changing workbench or creating records</li>
        </ul>
     </div>
    )
}

export default Home;