import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import JobList from "./JobList";
import { CurrentUserContext } from "../CurrentUserContext";
import JoblyApi from "../JoblyApi";
import React from "react";
import { vi } from "vitest";

// Mock the API call
vi.mock("../JoblyApi");

const mockApplyToJob = vi.fn();

const mockUser = {
  username: "testUser",
  applications: new Set(),  // No jobs applied yet
};

const renderJobList = (user = mockUser, searchTerm = "") => {
  return render(
    <CurrentUserContext.Provider value={{ currentUser: user }}>
      <JobList applyToJob={mockApplyToJob} />
    </CurrentUserContext.Provider>
  );
};

describe("JobList", () => {
  it("renders job cards when jobs are available", async () => {
    // Mock the API response
    const mockJobs = [
      { id: 1, title: "Software Engineer", salary: 120000, equity: 0.1 },
      { id: 2, title: "Product Manager", salary: 110000, equity: 0.05 },
    ];

    JoblyApi.getJobs.mockResolvedValue(mockJobs);  // Mock resolved API call

    renderJobList();

    // Check if the loading state is not visible after the data is fetched
    await waitFor(() => expect(screen.getByText("Software Engineer")).toBeInTheDocument());

    // Check if job cards are rendered
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Product Manager")).toBeInTheDocument();
  });

  it("displays 'No jobs found' when no jobs are returned", async () => {
    // Mock the API to return an empty array
    JoblyApi.getJobs.mockResolvedValue([]);

    renderJobList();

    // Check for 'No jobs found' message
    await waitFor(() => expect(screen.getByText("No jobs found")).toBeInTheDocument());
  });

});
