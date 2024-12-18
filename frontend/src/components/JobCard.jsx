import React, { useState } from "react";
import "./JobCard.css";

function JobCard({ job, applyToJob, hasApplied: initialAppliedState }) {
  const [hasApplied, setHasApplied] = useState(initialAppliedState);

  const handleApplyClick = async () => {
    if (!hasApplied) {
      await applyToJob(job.id);
      setHasApplied(true);
    }
  }

  if (!applyToJob) {
    console.error("applyToJob function is missing in JobCard");
  }

  return (
    <div className="JobCard">
      <div>
        <h3>{job.title}</h3>
        <p>Salary: {job.salary ? `$${job.salary}` : "Not listed"}</p>
        <p>Equity: {job.equity || "None"}</p>
      </div>
      <button
        onClick={handleApplyClick}
        disabled={hasApplied}
        className={hasApplied ? "btn-disabled" : "btn-apply"}
      >
        {hasApplied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;