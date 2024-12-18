import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignupForm from "./SignupForm";
import { vi } from "vitest";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <SignupForm signup={() => { }} />
        </MemoryRouter>
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <SignupForm signup={() => { }} />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

it("runs the signup function on form submit", async function () {
    const signupMock = vi.fn();
    const { getByLabelText, getByText } = render(
        <MemoryRouter>
            <SignupForm signup={signupMock} />
        </MemoryRouter>
    );

    const usernameInput = getByLabelText("Username :");
    const passwordInput = getByLabelText("Password :");
    const firstNameInput = getByLabelText("First Name :");
    const lastNameInput = getByLabelText("Last Name :");
    const emailInput = getByLabelText("E-mail :");
    const submitButton = getByText("Sign up");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(firstNameInput, { target: { value: "Test" } });
    fireEvent.change(lastNameInput, { target: { value: "User" } });
    fireEvent.change(emailInput, { target: { value: "testuser@example.com" } });

    fireEvent.click(submitButton);

    expect(signupMock).toHaveBeenCalledWith({
        username: "testuser",
        password: "password123",
        firstName: "Test",
        lastName: "User",
        email: "testuser@example.com",
    });
});
