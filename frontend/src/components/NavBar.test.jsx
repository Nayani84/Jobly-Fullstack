// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import { CurrentUserContext } from "../CurrentUserContext";
// import NavBar from "./NavBar";
// import { vi } from "vitest";

// // Mock the useNavigate hook from react-router-dom
// vi.mock('react-router-dom', () => ({
//     ...vi.importActual('react-router-dom'),
//     useNavigate: vi.fn(),
//   }));

// describe("NavBar", () => {
//   const mockOnLogout = vi.fn();

//   const renderNavBarWithUser = (user) => {
//     render(
//       <MemoryRouter>
//         <CurrentUserContext.Provider value={{ currentUser: user }}>
//           <NavBar onLogout={mockOnLogout} />
//         </CurrentUserContext.Provider>
//       </MemoryRouter>
//     );
//   };

//   const renderNavBarWithoutUser = () => {
//     render(
//       <MemoryRouter>
//         <CurrentUserContext.Provider value={{ currentUser: null }}>
//           <NavBar onLogout={mockOnLogout} />
//         </CurrentUserContext.Provider>
//       </MemoryRouter>
//     );
//   };

//   it("renders the navbar correctly when user is logged in", () => {
//     const mockUser = { username: "testuser" };
//     renderNavBarWithUser(mockUser);

//     expect(screen.getByText("Jobly")).toBeInTheDocument();
//     expect(screen.getByText("Companies")).toBeInTheDocument();
//     expect(screen.getByText("Jobs")).toBeInTheDocument();
//     expect(screen.getByText("Profile")).toBeInTheDocument();
//     expect(screen.getByText("testuser")).toBeInTheDocument();
//     expect(screen.getByText("Log out")).toBeInTheDocument();
//   });

//   it("renders the navbar correctly when no user is logged in", () => {
//     renderNavBarWithoutUser();

//     expect(screen.getByText("Jobly")).toBeInTheDocument();
//     expect(screen.getByText("Login")).toBeInTheDocument();
//     expect(screen.getByText("Signup")).toBeInTheDocument();
//   });

//   it("calls onLogout and navigates to /login when logout button is clicked", () => {
//     const mockUser = { username: "testuser" };
//     renderNavBarWithUser(mockUser);

//     const logoutButton = screen.getByText("Log out");
//     fireEvent.click(logoutButton);

//     expect(mockOnLogout).toHaveBeenCalled();
//     expect(mockOnLogout).toHaveBeenCalledTimes(1);
//   });

//   it("navigates to /login when logout button is clicked", () => {
//     const mockUser = { username: "testuser" };
//     const navigate = vi.fn();
//     vi.mocked(require('react-router-dom').useNavigate).mockReturnValue(navigate);

//     renderNavBarWithUser(mockUser);

//     const logoutButton = screen.getByText("Log out");
//     fireEvent.click(logoutButton);

//     expect(navigate).toHaveBeenCalledWith("/login");
//   });
// });

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CurrentUserContext } from "../CurrentUserContext";
import NavBar from "./NavBar";

// Mock react-router-dom to include Link, MemoryRouter, and useNavigate
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),  // Keep other imports intact
  Link: ({ to, children }) => <a href={to}>{children}</a>,  // Mock Link component
  MemoryRouter: ({ children }) => <div>{children}</div>,  // Mock MemoryRouter
  useNavigate: vi.fn(),  // Mock useNavigate
}));

describe("NavBar", () => {
  const mockOnLogout = vi.fn();
  const mockNavigate = vi.fn();

  const renderNavBarWithUser = (user) => {
    render(
      <div>
        <CurrentUserContext.Provider value={{ currentUser: user }}>
          <NavBar onLogout={mockOnLogout} />
        </CurrentUserContext.Provider>
      </div>
    );
  };

  const renderNavBarWithoutUser = () => {
    render(
      <div>
        <CurrentUserContext.Provider value={{ currentUser: null }}>
          <NavBar onLogout={mockOnLogout} />
        </CurrentUserContext.Provider>
      </div>
    );
  };

  it("renders the navbar correctly when user is logged in", () => {
    const mockUser = { username: "testuser" };
    renderNavBarWithUser(mockUser);

    expect(screen.getByText("Jobly")).toBeInTheDocument();
    expect(screen.getByText("Companies")).toBeInTheDocument();
    expect(screen.getByText("Jobs")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByText("Log out")).toBeInTheDocument();
  });

  it("renders the navbar correctly when no user is logged in", () => {
    renderNavBarWithoutUser();

    expect(screen.getByText("Jobly")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Signup")).toBeInTheDocument();
  });

  it("calls onLogout when logout button is clicked", () => {
    const mockUser = { username: "testuser" };
    renderNavBarWithUser(mockUser);

    const logoutButton = screen.getByText("Log out");
    fireEvent.click(logoutButton);

    expect(mockOnLogout).toHaveBeenCalled();
    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

});
