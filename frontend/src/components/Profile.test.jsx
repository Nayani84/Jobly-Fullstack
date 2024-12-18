// Profile.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from './Profile';
import { CurrentUserContext } from '../CurrentUserContext';
import { BrowserRouter } from 'react-router-dom';
import * as JoblyApi from '../JoblyApi';

// Correctly mock the named export for updateUser
vi.mock('../JoblyApi', () => ({
  updateUser: vi.fn()
}));

describe('Profile Component', () => {
  const mockUpdateCurrentUser = vi.fn();
  const currentUser = {
    username: 'testuser',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123'
  };

  beforeEach(() => {
    // Clear any previous mocks
    vi.clearAllMocks();
  });

  test('renders the profile form with user data', async () => {
    render(
      <BrowserRouter>
        <CurrentUserContext.Provider value={{ currentUser, updateCurrentUser: mockUpdateCurrentUser }}>
          <Profile />
        </CurrentUserContext.Provider>
      </BrowserRouter>
    );

    // Check that the form fields are populated with user data
    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
  });

  test('displays loading message if currentUser is not available', async () => {
    render(
      <BrowserRouter>
        <CurrentUserContext.Provider value={{ currentUser: null, updateCurrentUser: mockUpdateCurrentUser }}>
          <Profile />
        </CurrentUserContext.Provider>
      </BrowserRouter>
    );

    // Check that the loading message is displayed when currentUser is null
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

//   test('submitting the form updates the user profile and shows success message', async () => {
//     const updatedUser = { ...currentUser, firstName: 'Jane', lastName: 'Smith' };
//     // Mock successful API response
//     vi.mocked(JoblyApi.updateUser).mockResolvedValue(updatedUser);
//     render(
//       <BrowserRouter>
//         <CurrentUserContext.Provider value={{ currentUser, updateCurrentUser: mockUpdateCurrentUser }}>
//           <Profile />
//         </CurrentUserContext.Provider>
//       </BrowserRouter>
//     );

//     // Change the first name and last name
//     fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jane' } });
//     fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Smith' } });

//     // Submit the form
//     fireEvent.click(screen.getByText('Save Changes'));

//     // Check if the updateCurrentUser function was called with the updated user
//     expect(mockUpdateCurrentUser).toHaveBeenCalledWith(updatedUser);
//   });

  test('checks if username input is disabled', () => {
    render(
      <BrowserRouter>
        <CurrentUserContext.Provider value={{ currentUser, updateCurrentUser: mockUpdateCurrentUser }}>
          <Profile />
        </CurrentUserContext.Provider>
      </BrowserRouter>
    );

    // Check if the username input is disabled
    expect(screen.getByLabelText(/Username/i)).toBeDisabled();
  });
});
