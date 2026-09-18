---
name: postgres-transactions-and-isolation
description: Use when designing ACID database transactions, configuring isolation levels (Read Committed vs Serializable), row-level locking (FOR UPDATE), and preventing deadlocks.
---

# PostgreSQL Transactions, ACID & Isolation Levels

Transactions guarantee data consistency across multi-step mutations. Understanding isolation levels and locking semantics prevents lost updates, dirty reads, and deadlocks.

---

## 1. Transaction Isolation Levels Matrix

| Isolation Level | Dirty Reads | Non-Repeatable Reads | Phantom Reads | Serialization Anomalies |
| :--- | :--- | :--- | :--- | :--- |
| **Read Committed** (Default) | Impossible | Possible | Possible | Possible |
| **Repeatable Read** | Impossible | Impossible | Impossible | Possible |
| **Serializable** | Impossible | Impossible | Impossible | Impossible (Strict Serial Ordering) |

---

## 2. Preventing Lost Updates: Explicit Row-Level Locking (`FOR UPDATE`)

When reading data to compute a modification (e.g. transferring money from account balance):

```sql
-- Step 1: Lock the target account row against concurrent modifications
BEGIN;

SELECT balance FROM accounts 
WHERE id = 'acc_123' 
FOR UPDATE; -- Blocks other transactions from modifying this row until COMMIT

UPDATE accounts 
SET balance = balance - 50.00 
WHERE id = 'acc_123';

UPDATE accounts 
SET balance = balance + 50.00 
WHERE id = 'acc_456';

COMMIT;
```

---

## 3. Deadlock Prevention Golden Rule
A deadlock occurs when Transaction A holds Lock 1 and waits for Lock 2, while Transaction B holds Lock 2 and waits for Lock 1.

> **The Consistent Lock Ordering Rule**: Always acquire resource locks in the exact same alphabetical or numerical order across all transactions:
> ```typescript
> // Sort IDs ascending before locking
> const sortedAccountIds = [senderId, receiverId].sort();
> for (const id of sortedAccountIds) {
>   await tx.account.findUnique({ where: { id }, select: { id: true } });
> }
> ```
