import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";
import Home from "./Home";

describe("Home Component", () => {
  it("renders the loading state", () => {
    render(
      <CurrentUserContext.Provider value={{ currentUser: null }}>
        <Home loading={true} />
      </CurrentUserContext.Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders the guest view when no user is logged in", () => {
    render(
      <MemoryRouter>
        <CurrentUserContext.Provider value={{ currentUser: null }}>
          <Home loading={false} />
        </CurrentUserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Jobly!")).toBeInTheDocument();
    expect(
      screen.getByText("All the jobs in one, convenient place.")
    ).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("renders the logged-in view with the user's name", () => {
    const mockUser = { username: "johndoe", firstName: "John" };

    render(
      <CurrentUserContext.Provider value={{ currentUser: mockUser }}>
        <Home loading={false} />
      </CurrentUserContext.Provider>
    );

    expect(screen.getByText("Welcome back, johndoe!")).toBeInTheDocument();
  });

  it("updates from loading state to content", () => {
    const { rerender } = render(
        <MemoryRouter>
          <CurrentUserContext.Provider value={{ currentUser: null }}>
            <Home loading={true} />
          </CurrentUserContext.Provider>
        </MemoryRouter>
      );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    rerender(
        <MemoryRouter>
          <CurrentUserContext.Provider value={{ currentUser: null }}>
            <Home loading={false} />
          </CurrentUserContext.Provider>
        </MemoryRouter>
      );

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.getByText("Jobly!")).toBeInTheDocument();
  });
});
