import * as React from 'react';
import { Link } from 'react-router-dom';
export const MyNav: React.StatelessComponent<{}> = () => {
    return(
        <div className="vertical-menu">
            <Link to="/home" className="unset-anchor nav-link">Home</Link>
            <Link to="/third" className="unset-anchor nav-link">Manage Reimbursements</Link>
            <Link to="/second" className="unset-anchor nav-link">Submit Ticket</Link>
            <Link to="/sign-in" className="unset-anchor nav-link">Log out</Link>
        </div>

    );
}