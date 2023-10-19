/**
 * @jest-environment jsdom
 */

import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import Home, { Secure } from '../src/app/page'; // Assuming the file is named Home.tsx
import '@testing-library/jest-dom/extend-expect';

/**
 * Mock external modules and hooks to isolate our component under test.
 * This ensures that the behavior of these external dependencies does not affect our tests.
 */

// Mock the useAccount hook
jest.mock('../src/app/hooks/useAccount', () => ({
    useAccount: jest.fn().mockReturnValue({ isLoading: false, data: null })
}));

// Mock individual components
jest.mock('../src/app/components/accounts/account-form', () => () => <div>Account Form Mock</div>);
jest.mock('../src/app/components/accounts/balance-card', () => () => <div>Balance Card Mock</div>);
jest.mock('../src/app/components/loading', () => () => <div>Loading Mock</div>);
jest.mock('../src/app/components/transactions/transaction-form', () => () => <div>Transaction Form Mock</div>);
jest.mock('../src/app/components/transactions/transaction-list', () => () => <div>Transaction List Mock</div>);
jest.mock('../src/app/login/login', () => ({ children }: { children: React.ReactNode }) => <div>Login Mock {children}</div>);


/**
 * Test suite for <Home /> component.
 */
describe('<Home />', () => {

    /**
     * Test case: Check if the Home component renders without crashing.
     */
    it('renders without crashing', () => {
        render(<Home />);
    });
});

/**
 * Test suite for <Secure /> component.
 */
describe('<Secure />', () => {

    /**
     * Test case: Ensure the Loading component is displayed while data is being fetched.
     */
    it('shows loading when data is being fetched', () => {
        // Override the mock value for useAccount for this test case
        const mockUseAccount = require('./hooks/useAccount').useAccount;
        mockUseAccount.mockReturnValueOnce({ isLoading: true });

        const { getByText } = render(<Secure />);
        expect(getByText('Loading Mock')).toBeInTheDocument();
    });

    /**
     * Test case: Ensure the AccountForm component is displayed when no account data is available.
     */
    it('shows account form when no account exists', () => {
        // Override the mock value for useAccount for this test case
        const mockUseAccount = require('./hooks/useAccount').useAccount;
        mockUseAccount.mockReturnValueOnce({ isLoading: false, data: null });

        const { getByText } = render(<Secure />);
        expect(getByText('Account Form Mock')).toBeInTheDocument();
    });

    // Additional tests for different scenarios and edge cases can be added below...
});
