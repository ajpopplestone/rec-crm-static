import React from 'react';
import './Sidebar.css';

const Sidebar = ( props ) => {
    return (
        <div class="sidebar-container">
            <div class="home">Home</div>
            <div class="clients">Clients</div>
            <div class="candidates">Candidates</div>
            <div class="vacancies">Vacancies</div>
            <div class="admin">Admin</div>
        </div>
    )
}
export default Sidebar;