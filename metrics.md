1. Authentication & Customer Registration (Sept-Dec 2024)

  -- New customer registrations
  SELECT
    DATE_FORMAT(createdAt, '%Y-%m') as signup_month,
    COUNT(DISTINCT id) as new_customers
  FROM customers
  WHERE createdAt >= '2024-09-01'
  GROUP BY DATE_FORMAT(createdAt, '%Y-%m')
  ORDER BY signup_month DESC;

Before Sept 24
+--------------+---------------+
| signup_month | new_customers |
+--------------+---------------+
| 2024-08      |            27 |
| 2024-07      |            11 |
| 2024-06      |             6 |
| 2024-05      |            11 |
| 2024-04      |            12 |
| 2024-03      |            94 |
| 2024-01      |             5 |
| 2023-12      |            12 |
+--------------+---------------+

After
  +--------------+---------------+
| signup_month | new_customers |
+--------------+---------------+
| 2026-04      |            28 |
| 2026-03      |            40 |
| 2026-02      |            32 |
| 2026-01      |            37 |
| 2025-12      |            20 |
| 2025-11      |            11 |
| 2025-10      |            18 |
| 2025-09      |            20 |
| 2025-08      |            18 |
| 2025-07      |            20 |
| 2025-06      |            34 |
| 2025-05      |            27 |
| 2025-04      |            37 |
| 2025-03      |            41 |
| 2025-02      |            12 |
| 2025-01      |            36 |
| 2024-12      |            21 |
| 2024-11      |            37 |
| 2024-10      |            30 |
| 2024-09      |            33 |
+--------------+---------------+

  -- Customer verification adoption
  SELECT
    COUNT(DISTINCT id) as total_customers,
    COUNT(CASE WHEN verifiedAt IS NOT NULL THEN id END) as email_verified,
    COUNT(CASE WHEN phoneVerifiedAt IS NOT NULL THEN id END) as phone_verified,
    COUNT(CASE WHEN verifiedAt IS NOT NULL AND phoneVerifiedAt IS NOT NULL THEN id
  END) as fully_verified,
    ROUND(COUNT(CASE WHEN verifiedAt IS NOT NULL THEN id END) * 100.0 / COUNT(*), 2)
  as verification_rate_pct
  FROM customers
  WHERE createdAt >= '2024-09-01';

Before Sept 24
  +-----------------+----------------+----------------+----------------+-----------------------+
| total_customers | email_verified | phone_verified | fully_verified | verification_rate_pct |
+-----------------+----------------+----------------+----------------+-----------------------+
|             178 |            177 |              8 |              8 |                 99.44 |
+-----------------+----------------+----------------+----------------+-----------------------+
  
  After
  +-----------------+----------------+----------------+----------------+-----------------------+
| total_customers | email_verified | phone_verified | fully_verified | verification_rate_pct |
+-----------------+----------------+----------------+----------------+-----------------------+
|             552 |            483 |            245 |            193 |                 87.50 |
+-----------------+----------------+----------------+----------------+-----------------------+

  2. Receipt Upload & OCR System (Apr-May 2025)

  -- Receipt submissions by status
  SELECT
    `status`,
    COUNT(DISTINCT id) as receipt_count,
    COUNT(DISTINCT _customer) as unique_customers,
    COUNT(DISTINCT _restaurant_store) as restaurants_involved
  FROM receipt_submissions
  WHERE createdAt >= '2025-09-01'
  GROUP BY `status`
  ORDER BY receipt_count DESC;

  +------------------+---------------+------------------+----------------------+
| status           | receipt_count | unique_customers | restaurants_involved |
+------------------+---------------+------------------+----------------------+
| APPROVED         |             8 |                8 |                    5 |
| WAITING_APPROVAL |             4 |                2 |                    2 |
| DRAFT            |             3 |                3 |                    3 |
+------------------+---------------+------------------+----------------------+

  -- Receipt approval workflow metrics
  SELECT
    DATE_FORMAT(createdAt, '%Y-%m') as month,
    COUNT(DISTINCT id) as submitted_receipts,
    COUNT(CASE WHEN `status` = 'APPROVED' THEN id END) as approved_count,
    COUNT(CASE WHEN `status` = 'REJECTED' THEN id END) as rejected_count,
    ROUND(COUNT(CASE WHEN `status` = 'APPROVED' THEN id END) * 100.0 / COUNT(*), 2) as
   approval_rate_pct
  FROM receipt_submissions
  WHERE createdAt >= '2025-04-01'
  GROUP BY DATE_FORMAT(createdAt, '%Y-%m')
  ORDER BY month DESC;

  +---------+--------------------+----------------+----------------+-------------------+
| month   | submitted_receipts | approved_count | rejected_count | approval_rate_pct |
+---------+--------------------+----------------+----------------+-------------------+
| 2026-03 |                  4 |              1 |              0 |             25.00 |
| 2026-02 |                  3 |              2 |              0 |             66.67 |
| 2026-01 |                  3 |              2 |              0 |             66.67 |
| 2025-12 |                  1 |              1 |              0 |            100.00 |
| 2025-11 |                  1 |              1 |              0 |            100.00 |
| 2025-10 |                  1 |              0 |              0 |              0.00 |
| 2025-09 |                  2 |              1 |              0 |             50.00 |
| 2025-08 |                  1 |              1 |              0 |            100.00 |
| 2025-07 |                  6 |              5 |              1 |             83.33 |
+---------+--------------------+----------------+----------------+-------------------+

  3. Wallet System & Auto-Recharge (Oct-Dec 2025)

  -- Wallet adoption metrics
  SELECT
    COUNT(DISTINCT owner_id) as customers_with_wallet,
    COUNT(DISTINCT id) as total_wallets,
    SUM(CASE WHEN available_balance_minor > 0 THEN 1 ELSE 0 END) as active_wallets_with_funds
  FROM wallets
  WHERE created_at >= '2025-10-01';

  +-----------------------+---------------+---------------------------+
| customers_with_wallet | total_wallets | active_wallets_with_funds |
+-----------------------+---------------+---------------------------+
|                   883 |           883 |                        19 |
+-----------------------+---------------+---------------------------+

  -- Wallet balance distribution
  SELECT
    COUNT(DISTINCT owner_id) as customers,
    ROUND(SUM(available_balance_minor) / 100.0, 2) as total_wallet_balance_usd,
    ROUND(AVG(available_balance_minor) / 100.0, 2) as avg_balance_per_customer,
    ROUND(MAX(available_balance_minor) / 100.0, 2) as max_balance
  FROM wallets
  WHERE available_balance_minor > 0 AND created_at >= '2025-10-01';

  +-----------+--------------------------+--------------------------+-------------+
| customers | total_wallet_balance_usd | avg_balance_per_customer | max_balance |
+-----------+--------------------------+--------------------------+-------------+
|        19 |                  3687.67 |                   194.09 |      200.00 |
+-----------+--------------------------+--------------------------+-------------+

  -- Auto-recharge adoption
  SELECT
    COUNT(DISTINCT owner_id) as restaurants_with_autorecharge_enabled,
    COUNT(DISTINCT CASE
      WHEN JSON_EXTRACT(metadata, '$.autoRecharge.enabled') = true
      THEN id
    END) as wallets_with_autorecharge_active
  FROM wallets
  WHERE owner_type IN ('RESTAURANT', 'BUSINESS_ENTITY')
    AND created_at >= '2025-10-01'
    AND JSON_EXTRACT(metadata, '$.autoRecharge.enabled') = true;

    +---------------------------------------+----------------------------------+
| restaurants_with_autorecharge_enabled | wallets_with_autorecharge_active |
+---------------------------------------+----------------------------------+
|                                    30 |                               30 |
+---------------------------------------+----------------------------------+


  5. Double-Entry Bookkeeping & Revenue (Aug-Sep 2025)

  -- Revenue accounts tracking (your ledger work)
  SELECT
    a.type as account_type,
    a.category,
    COUNT(DISTINCT je.id) as journal_entries,
    ROUND(SUM(CASE WHEN je.side = 'CR' THEN je.amount_minor ELSE -je.amount_minor END) /
   100.0, 2) as net_amount_usd
  FROM journal_entries je
  JOIN accounts a ON je.account_id = a.id
  WHERE a.category = 'REVENUE'
    AND je.created_at >= '2025-08-01'
    AND a.type IN ('PROCESSING_FEE_REVENUE', 'SUBSCRIPTION_REVENUE',
  'BREAKAGE_REVENUE')
  GROUP BY a.type, a.category
  ORDER BY net_amount_usd DESC;

  +------------------------+----------+-----------------+----------------+
| account_type           | category | journal_entries | net_amount_usd |
+------------------------+----------+-----------------+----------------+
| SUBSCRIPTION_REVENUE   | REVENUE  |             118 |        6878.58 |
| BREAKAGE_REVENUE       | REVENUE  |              21 |        2244.74 |
| PROCESSING_FEE_REVENUE | REVENUE  |             287 |         510.80 |
+------------------------+----------+-----------------+----------------+

  -- Total platform revenue from ledger (all time)
  SELECT
    a.type as revenue_account,
    COUNT(DISTINCT je.id) as transactions,
    ROUND(SUM(CASE WHEN je.side = 'CR' THEN je.amount_minor ELSE -je.amount_minor END) /
   100.0, 2) as total_revenue_usd
  FROM journal_entries je
  JOIN accounts a ON je.account_id = a.id
  WHERE a.category = 'REVENUE'
  GROUP BY a.type
  ORDER BY total_revenue_usd DESC;

  +------------------------+--------------+-------------------+
| revenue_account        | transactions | total_revenue_usd |
+------------------------+--------------+-------------------+
| SUBSCRIPTION_REVENUE   |          152 |           9838.31 |
| BREAKAGE_REVENUE       |           21 |           2244.74 |
| PROCESSING_FEE_REVENUE |          603 |           1397.03 |
+------------------------+--------------+-------------------+

  -- Monthly revenue trend (Aug 2025+)
  SELECT
    DATE_FORMAT(je.created_at, '%Y-%m') as month,
    SUM(CASE WHEN a.type = 'PROCESSING_FEE_REVENUE' AND je.side = 'CR' THEN
  je.amount_minor
             WHEN a.type = 'PROCESSING_FEE_REVENUE' AND je.side = 'DR' THEN
  -je.amount_minor ELSE 0 END) / 100.0 as processing_fees,
    SUM(CASE WHEN a.type = 'SUBSCRIPTION_REVENUE' AND je.side = 'CR' THEN
  je.amount_minor
             WHEN a.type = 'SUBSCRIPTION_REVENUE' AND je.side = 'DR' THEN
  -je.amount_minor ELSE 0 END) / 100.0 as subscription_revenue,
    SUM(CASE WHEN a.type = 'BREAKAGE_REVENUE' AND je.side = 'CR' THEN je.amount_minor
             WHEN a.type = 'BREAKAGE_REVENUE' AND je.side = 'DR' THEN -je.amount_minor
  ELSE 0 END) / 100.0 as breakage_revenue
  FROM journal_entries je
  JOIN accounts a ON je.account_id = a.id
  WHERE a.category = 'REVENUE' AND je.created_at >= '2025-01-01'
  GROUP BY DATE_FORMAT(je.created_at, '%Y-%m')
  ORDER BY month DESC;

+---------+-----------------+----------------------+------------------+
| month   | processing_fees | subscription_revenue | breakage_revenue |
+---------+-----------------+----------------------+------------------+
| 2026-04 |         21.7400 |             558.9800 |         103.3000 |
| 2026-03 |        109.8500 |             869.9600 |         920.2900 |
| 2026-02 |         67.1600 |             889.9500 |           0.0000 |
| 2026-01 |         40.5200 |             819.9600 |        1221.1500 |
| 2025-12 |         48.2800 |             789.9500 |           0.0000 |
| 2025-11 |         43.5600 |             859.9400 |           0.0000 |
| 2025-10 |         65.4100 |             859.9400 |           0.0000 |
| 2025-09 |         51.4100 |             859.9400 |           0.0000 |
| 2025-08 |         62.8700 |             369.9600 |           0.0000 |
| 2025-07 |         55.9800 |             369.9600 |           0.0000 |
| 2025-06 |         55.1200 |             369.9600 |           0.0000 |
| 2025-05 |         96.0600 |             439.9500 |           0.0000 |
| 2025-04 |         44.5800 |             369.9600 |           0.0000 |
| 2025-03 |         64.2300 |             369.9600 |           0.0000 |
| 2025-02 |         52.0000 |             329.9800 |           0.0000 |
| 2025-01 |         63.6900 |             329.9800 |           0.0000 |
+---------+-----------------+----------------------+------------------+****
