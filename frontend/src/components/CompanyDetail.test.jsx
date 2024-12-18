import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CompanyDetail from "./CompanyDetail";
import { CurrentUserContext } from "../CurrentUserContext";
import JoblyApi from "../JoblyApi";
import { vi } from "vitest";

// Mock JoblyApi to simulate API responses
vi.mock("../JoblyApi");

const testCompany = {
  handle: "test-company",
  name: "Test Company",
  description: "This is a test company.",
  jobs: [
    { id: 1, title: "Software Engineer", salary: 100000, equity: "0.1" },
    { id: 2, title: "Data Scientist", salary: 120000, equity: "0.05" },
  ],
};

describe("CompanyDetail Component", () => {
  it("renders without crashing", async () => {
    JoblyApi.getCompany.mockResolvedValue(testCompany);

    render(
      <MemoryRouter initialEntries={["/companies/test-company"]}>
        <Routes>
          <Route
            path="/companies/:handle"
            element={
              <CurrentUserContext.Provider value={{ currentUser: { applications: new Set() } }}>
                <CompanyDetail applyToJob={vi.fn()} />
              </CurrentUserContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("Test Company")).toBeInTheDocument();
  });

  it("matches snapshot", async () => {
    JoblyApi.getCompany.mockResolvedValue(testCompany);

    const { asFragment } = render(
      <MemoryRouter initialEntries={["/companies/test-company"]}>
        <Routes>
          <Route
            path="/companies/:handle"
            element={
              <CurrentUserContext.Provider value={{ currentUser: { applications: new Set() } }}>
                <CompanyDetail applyToJob={vi.fn()} />
              </CurrentUserContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Test Company"));
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays company and job details correctly", async () => {
    JoblyApi.getCompany.mockResolvedValue(testCompany);

    render(
      <MemoryRouter initialEntries={["/companies/test-company"]}>
        <Routes>
          <Route
            path="/companies/:handle"
            element={
              <CurrentUserContext.Provider value={{ currentUser: { applications: new Set() } }}>
                <CompanyDetail applyToJob={vi.fn()} />
              </CurrentUserContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("Test Company")).toBeInTheDocument();
    expect(screen.getByText("This is a test company.")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Data Scientist")).toBeInTheDocument();
  });

  it("handles loading state", () => {
    render(
      <MemoryRouter initialEntries={["/companies/test-company"]}>
        <Routes>
          <Route
            path="/companies/:handle"
            element={
              <CurrentUserContext.Provider value={{ currentUser: { applications: new Set() } }}>
                <CompanyDetail applyToJob={vi.fn()} />
              </CurrentUserContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
