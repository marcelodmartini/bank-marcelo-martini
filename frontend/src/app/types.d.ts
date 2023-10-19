  /**
  * Represents an account with properties like ID, name, number, and balance.
  */
  interface Account {
    id: number;             // Unique identifier for the account
    name: string;           // Name associated with the account
    number: number;         // Account number
    balance: number;        // Current balance of the account
  }
  
  /**
   * Represents the data required to create a new transaction.
   */
  interface CreateTransaction {
    amount: Transaction["amount"];       // Amount to be transacted
    type: Transaction["type"];           // Type of the transaction, either DEPOSIT or WITHDRAWAL
    accountId: Transaction["accountId"]; // ID of the account where the transaction is to be made
  }

  /**
   * Represents a transaction made on an account, which could be a deposit or withdrawal.
   */
  interface Transaction {
    id: number;                 // Unique identifier for the transaction
    amount: number;             // Amount involved in the transaction
    type: TransactionType;     // Specifies the type of transaction, either DEPOSIT or WITHDRAWAL
    createdAt: string;         // Timestamp indicating when the transaction was made
    accountId: Account["id"];  // The ID of the account on which the transaction was made
  }
  
  /**
   * Specifies the different types of transactions an account can have.
   */
  type TransactionType = "DEPOSIT" | "WITHDRAWAL";
  
  