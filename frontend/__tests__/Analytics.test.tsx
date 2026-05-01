import { render, screen } from '@testing-library/react';
import Analytics from '../app/analytics/page';

describe('Analytics Page', () => {
  it('renders analytics dashboard', () => {
    render(<Analytics />);
    expect(screen.getByText('Election Analytics')).toBeInTheDocument();
  });
});