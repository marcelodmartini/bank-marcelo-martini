import { renderHook, act } from '@testing-library/react-hooks';
import useAccount from '../../src/app/hooks/useAccount';
import AccountService from '../../src/app/services/accounts';
import TransactionService from '../../src/app/services/transactions';

// Mocking the external dependencies for an isolated hook testing.
jest.mock('../../src/app/services/accounts');
jest.mock('../../src/app/services/transactions');

// Mocking AWS Amplify API calls.
jest.mock('aws-amplify', () => ({
  API: {
    post: jest.fn(),
    get: jest.fn()
  }
}));

describe('useAccount hook', () => {
  
  // Test data setup
  const mockAccounts = [{ id: 'account1' }];
  const mockTransactions = [{ id: 'trans1' }];

  // Setting up mock resolutions for the services before each test.
  beforeEach(() => {
    AccountService.list.mockResolvedValue(mockAccounts);
    TransactionService.list.mockResolvedValue(mockTransactions);
  });

  // Clearing all mocks after each test to prevent side-effects.
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Helper function: waits until the isLoading state becomes false.
  const waitForLoadingToBeFalse = async (result, waitForNextUpdate) => {
    while(result.current.isLoading) {
        await waitForNextUpdate();
    }
  };

  /**
   * Test: Initial Data Fetch on Render
   * Goal: Verify that the hook correctly fetches account and transaction data upon its initial rendering.
   */
  it('should fetch account and transaction data on initial render', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAccount());
    
    // Initial state expectation: loading should be true.
    expect(result.current.isLoading).toBe(true);

    // Wait until data fetching is completed.
    await waitForLoadingToBeFalse(result, waitForNextUpdate);

    // Assertions: services are called once, data is correctly set, loading state becomes false.
    expect(AccountService.list).toHaveBeenCalledTimes(1);
    expect(TransactionService.list).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual({
      account: mockAccounts[0],
      transactions: mockTransactions,
    });
    expect(result.current.isLoading).toBe(false);
  });

  /**
   * Test: Handling Scenario With No Accounts
   * Goal: Ensure that the hook correctly handles the case when no accounts are returned from the AccountService.
   */
  it('should handle no accounts scenario', async () => {
    AccountService.list.mockResolvedValueOnce([]);
    
    const { result, waitForNextUpdate } = renderHook(() => useAccount());

    // Wait until data fetching is completed.
    await waitForLoadingToBeFalse(result, waitForNextUpdate);

    // Assertions: data should be null, loading state becomes false.
    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  /**
   * Test: Data Refresh Capability
   * Goal: Verify that the hook is capable of refreshing its data when the `refreshData` method gets called.
   */
  it('should refresh data when refreshData is called', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAccount());

    // Wait for initial data fetch to complete.
    await waitForLoadingToBeFalse(result, waitForNextUpdate);

    // Trigger data refreshing.
    act(() => {
      result.current.refreshData();
    });

    // State expectation during refresh: loading should be true.
    expect(result.current.isLoading).toBe(true);

    // Wait until data refreshing is completed.
    await waitForLoadingToBeFalse(result, waitForNextUpdate);

    // Assertions: services are called twice (initial fetch and refresh).
    expect(AccountService.list).toHaveBeenCalledTimes(2);
    expect(TransactionService.list).toHaveBeenCalledTimes(2);
  });
});
