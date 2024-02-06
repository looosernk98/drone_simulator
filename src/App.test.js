import { render, screen } from '@testing-library/react';
import App from './App';

test('test heading', () => {
  render(<App />);
  const heading = screen.getByText('Drone Simulator');
  expect(heading).toBeInTheDocument();
});
