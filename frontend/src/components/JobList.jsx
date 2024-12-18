import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../JoblyApi";
import JobCard from "./JobCard";
import SearchBar from "./SearchBar";
import { CurrentUserContext } from "../CurrentUserContext";

function JobList({ applyToJob }) {
    const { currentUser } = useContext(CurrentUserContext);
    const [jobList, setJobList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchJobs() {
            const jobsData = await JoblyApi.getJobs(searchTerm);
            console.log("Jobs fetched:", jobsData);
            setJobList(jobsData);
        }
        fetchJobs();
    }, [searchTerm]);

    const safeJobs = jobList || [];
    console.log("Safe jobs:", safeJobs);
    return (
        <div>
            <SearchBar setSearchTerm={setSearchTerm} />
            <div>
                {safeJobs.length > 0 ? (
                    safeJobs.map(job =>
                        <JobCard
                            key={job.id}
                            job={job}
                            applyToJob={applyToJob}
                            hasApplied={currentUser?.applications?.has?.(job.id) || false} />)
                ) : (
                    <p>No jobs found</p>
                )}
            </div>
        </div>
    );
}

export default JobList;