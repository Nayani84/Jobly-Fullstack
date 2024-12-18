import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../JoblyApi";
import JobCard from "./JobCard";
import { CurrentUserContext } from "../CurrentUserContext";
import './CompanyDetail.css';


function CompanyDetail({ applyToJob }) {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const { currentUser } = useContext(CurrentUserContext);

  // Fetch the company details on mount
  useEffect(() => {
    async function fetchCompany() {
      try {
        const company = await JoblyApi.getCompany(handle);
        setCompany(company);
      } catch (err) {
        console.error("Error fetching company data:", err);
      }
    }
    fetchCompany();
  }, [handle]);

  if (!company) return <p>Loading...</p>;

  return (
    <div className="CompanyDetail">
      <h2>{company.name}</h2>
      <p className="ComSum">{company.description}</p>
      <ul>
        {company.jobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            applyToJob={applyToJob}
            hasApplied={currentUser?.applications?.has?.(job.id) || false} />
        ))}
      </ul>
    </div>
  );
}

export default CompanyDetail;
