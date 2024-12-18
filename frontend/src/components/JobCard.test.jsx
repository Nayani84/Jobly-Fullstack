import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import JobCard from "./JobCard";
import { vi } from "vitest";

// Mock job data
const testJob = {
    id: 1,
    title: "Software Engineer",
    salary: 120000,
    equity: 0.02,
};

describe("JobCard Component", () => {
    it("renders without crashing", () => {
        render(<JobCard job={testJob} hasApplied={false} applyToJob={vi.fn()} />);
        expect(screen.getByText("Software Engineer")).toBeInTheDocument();
        expect(screen.getByText("Salary: $120000")).toBeInTheDocument();
        expect(screen.getByText("Equity: 0.02")).toBeInTheDocument();
    });

    it("renders 'Apply' button initially if the job is not applied", () => {
        render(<JobCard job={testJob} hasApplied={false} applyToJob={vi.fn()} />);
        const applyButton = screen.getByText("Apply");
        expect(applyButton).toBeInTheDocument();
        expect(applyButton).not.toBeDisabled();
    });

    it("renders 'Applied' button if the job is already applied", () => {
        render(<JobCard job={testJob} hasApplied={true} applyToJob={vi.fn()} />);
        const appliedButton = screen.getByText("Applied");
        expect(appliedButton).toBeInTheDocument();
        expect(appliedButton).toBeDisabled();
    });

    it("calls applyToJob function on 'Apply' button click", async () => {
        const mockApplyToJob = vi.fn(() => Promise.resolve());
        render(<JobCard job={testJob} hasApplied={false} applyToJob={mockApplyToJob} />);
        const applyButton = screen.getByText("Apply");

        fireEvent.click(applyButton);

        expect(mockApplyToJob).toHaveBeenCalledTimes(1);
        expect(mockApplyToJob).toHaveBeenCalledWith(1); // Ensure it passes the job id
    });

    it("disables the 'Apply' button after clicking it", async () => {
        const mockApplyToJob = vi.fn(() => Promise.resolve());
        render(<JobCard job={testJob} hasApplied={false} applyToJob={mockApplyToJob} />);
        const applyButton = screen.getByText("Apply");

        fireEvent.click(applyButton);

        await screen.findByText("Applied");

        // Button should now be disabled
        expect(applyButton).toBeDisabled();
        expect(applyButton).toHaveTextContent("Applied");
    });

    it("logs an error if applyToJob function is missing", () => {
        const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => { });

        render(<JobCard job={testJob} hasApplied={false} />);
        expect(consoleErrorSpy).toHaveBeenCalledWith("applyToJob function is missing in JobCard");

        consoleErrorSpy.mockRestore();
    });
});
