import React, { useEffect, useState } from "react";
import JoblyApi from "../JoblyApi";
import CompanyCard from "./CompanyCard";
import SearchBar from "./SearchBar";
import "./CompanyList.css";

function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchCompanies() {
            const companies = await JoblyApi.getCompanies(searchTerm);
            setCompanies(companies);
        }
        fetchCompanies(companies);
    }, [searchTerm]);

    return (
        <div >

            <SearchBar setSearchTerm={setSearchTerm} />

            <div>
                {companies.length > 0 ? (
                    companies.map(company => (
                        <CompanyCard company={company} key={company.handle} />
                    ))
                ) : (
                    <p>No companies found</p>
                )}
            </div>
        </div>
    );
}

export default CompanyList;