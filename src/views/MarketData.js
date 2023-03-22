import React, { useState } from 'react';

function StockQuotes() {
  const [symbol, setSymbol] = useState('');
  const [quotes, setQuotes] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/stock-quotes/${symbol}");
    const data = await response.json();
    setQuotes(data);
  };

  const handleChange = (event) => {
    setSymbol(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Symbol:
          <input type="text" value={symbol} onChange={handleChange} />
        </label>
        <button type="submit">Get Quotes</button>
      </form>
      {quotes && (
        <div>
          <h3>{symbol} Quotes:</h3>
          <p>Ask: {quotes.ask_price}</p>
          <p>Bid: {quotes.bid_price}</p>
          <p>Last: {quotes.last_trade_price}</p>
        </div>
      )}
    </div>
  );
}

export default StockQuotes;


