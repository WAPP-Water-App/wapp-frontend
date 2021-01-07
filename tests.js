import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from 'react-dom';
import '@testing-library/jest-dom/extend-expect'
//component imports

//

//display dashboard
test('loads the date', async () => {
    render(<Fetch url="/data/alldays" />)

    await waitFor(() => screen.getByDisplayValue('calendar-date'))

    expect(screen.getByDisplayValue('calendar-date')).toHaveTextContent(selectedDay.progress)
})

//test display
test('checks display', async () => {
    fireEvent.click(screen.getByRole('trigger'))
    expect(screen.getByRole('button', {name: /progress/i})
})

//tests login
test('checks login', async () => {
    fireEvent.click(<a href={`${process.env.REACT_APP_WAPP_API}/authorize`}>login</a>
     expect(screen.getByText('login').closest('a')).toHaveAttribute('href', '<a href={`${process.env.REACT_APP_WAPP_API}/authorize`}>login</a>')
    
})

//tests logout
test('checks logout', async () => {
    fireEvent.click('')
})

