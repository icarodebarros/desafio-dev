import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ByCodersTec header', () => {
  render(<App />);
  const linkElement = screen.getByText(/ByCodersTec/i);
  expect(linkElement).toBeInTheDocument();
});
