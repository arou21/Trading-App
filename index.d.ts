interface IPosition {
  symbol;
  exchange;
  asset_class;
  avg_entry_price;
  qty;
  side;
  market_value;
  cost_basis;
  unrealized_pl;
  unrealized_plpc;
  unrealized_intraday_pl;
  unrealized_intraday_plpc;
  current_price;
  lastday_price;
  change_today;
}

const AccountSample = {
  account_blocked: false,
  account_number: "PA3SJ2O58MKR",
  buying_power: "188654.22477",
  cash: "95483.89",
  created_at: "Tue, 07 Mar 2023 15:11:09 GMT",
  currency: "USD",
  id: "d6542326-7f1f-4579-a65a-b416a1b8cd08",
  pattern_day_trader: false,
  portfolio_value: "99976.25977",
  status: "ACTIVE",
  trading_blocked: false,
  transfers_blocked: false,
};

type IAccount = typeof AccountSample;
