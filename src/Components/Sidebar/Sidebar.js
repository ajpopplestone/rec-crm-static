import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {
    buildSidebar = () => {
        const workbenches = ['Home', 'Client', 'Candidate']
        let sidebar = []
        for (var workbench of workbenches) {
            let className = (workbench.toLowerCase() === this.props.workbench ? 'selected' : '')
            sidebar.push(
                <div
                    key={workbench.toLowerCase()}
                    className={className} 
                    onClick={this.props.changeWorkbench.bind(this, workbench.toLowerCase())}>{workbench}</div>)
        }
        return sidebar
    } 
    
    
    render () {
        return (
            <div className="sidebar-container">
                {this.buildSidebar()}
            </div>
        )
        
    }
}
export default Sidebar;



