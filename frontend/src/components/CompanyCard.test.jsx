import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CompanyCard from "./CompanyCard";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <CompanyCard company={{ handle: "test-company", name: "Test Company", description: "This is a test company." }} />
        </MemoryRouter>
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <CompanyCard company={{ handle: "test-company", name: "Test Company", description: "This is a test company." }} />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

it("displays company details correctly", function () {
    const { getByText } = render(
        <MemoryRouter>
            <CompanyCard company={{ handle: "test-company", name: "Test Company", description: "This is a test company." }} />
        </MemoryRouter>
    );

    expect(getByText("Test Company")).toBeInTheDocument();
    expect(getByText("This is a test company.")).toBeInTheDocument();
});
