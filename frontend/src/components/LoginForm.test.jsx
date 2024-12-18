import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "./LoginForm";
import { vi } from "vitest";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <loginForm login={() => { }} />
        </MemoryRouter>
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <LoginForm login={() => { }} />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

it("runs the login function on form submit", async function () {
    const loginMock = vi.fn();
    const { getByLabelText, getByText } = render(
        <MemoryRouter>
            <LoginForm login={loginMock} />
        </MemoryRouter>
    );

    const usernameInput = getByLabelText("Username :");
    const passwordInput = getByLabelText("Password :");
    const submitButton = getByText("Log in");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    expect(loginMock).toHaveBeenCalledWith({
        username: "testuser",
        password: "password123",
    });
});
