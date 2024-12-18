import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

function CompanyCard({ company }) {

    return (
        <div className="CompanyCard">

            <h3><Link to={`/companies/${company.handle}`}>{company.name}</Link></h3>
            <p>{company.description}</p>

        </div>
    );
}

export default CompanyCard;