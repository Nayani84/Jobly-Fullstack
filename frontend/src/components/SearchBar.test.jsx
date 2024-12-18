import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  test("renders input field and submit button", () => {
    render(<SearchBar setSearchTerm={() => {}} />);

    // Check if the input field is rendered
    const inputField = screen.getByPlaceholderText("Search");
    expect(inputField).toBeInTheDocument();

    // Check if the submit button is rendered
    const submitButton = screen.getByText("Submit");
    expect(submitButton).toBeInTheDocument();
  });

  test("updates input value on typing", () => {
    render(<SearchBar setSearchTerm={() => {}} />);

    const inputField = screen.getByPlaceholderText("Search");

    // Simulate typing into the input field
    fireEvent.change(inputField, { target: { value: "test query" } });

    // Assert the input field reflects the typed value
    expect(inputField.value).toBe("test query");
  });

  test("calls setSearchTerm with the correct value on form submission", () => {
    const mockSetSearchTerm = vi.fn();
    render(<SearchBar setSearchTerm={mockSetSearchTerm} />);

    const inputField = screen.getByPlaceholderText("Search");
    const submitButton = screen.getByText("Submit");

    // Simulate typing into the input field
    fireEvent.change(inputField, { target: { value: "test query" } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Assert the setSearchTerm function was called with the correct value
    expect(mockSetSearchTerm).toHaveBeenCalledWith("test query");

    // Assert the input field is cleared after submission
    expect(inputField.value).toBe("");
  });
});
