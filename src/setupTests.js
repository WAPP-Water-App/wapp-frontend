// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// component imports
import Display from '/Display/Display.jsx'


test('renders Display', () => {
    render (<Display />);
    const h3Element = Screen.getByText('/components/Display.jsx/i');
    expect (h3Element).toBeInTheDocument();
})

test('login component test', () => {
    render (<Login />);
    const h2Element = Screen.getByText('/components/Login.jsx/i');
    expect (h2Element).toBeInTheDocument();
})

test('Navbar Test', () => {
    render (<Navbar />);
    const h4Element = Screen.getByText('/components/Navbar.jsx/i');
    expect (h4Element).toBeInTheDocument();
})

test('Reminder Test', () => {
    render (<Reminder />);
    const h5Element = Screen.getByText('/components/Reminder/')
    expect (h5Element).toBeInTheDocument();
})




export default setUpTests.js
