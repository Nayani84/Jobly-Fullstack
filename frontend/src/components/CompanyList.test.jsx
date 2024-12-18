import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CompanyList from "./CompanyList";
import JoblyApi from "../JoblyApi";
import { vi } from "vitest";

// Mock the JoblyApi
vi.mock("../JoblyApi");

const mockCompanies = [
  { handle: "company1", name: "Company One", description: "A great company" },
  { handle: "company2", name: "Company Two", description: "Another great company" },
];

describe("CompanyList Component", () => {
  it("renders without crashing", () => {
    JoblyApi.getCompanies.mockResolvedValue(mockCompanies);

    render(<CompanyList />);

    expect(screen.getByText("No companies found")).toBeInTheDocument();
  });

 
});
