import React, { useEffect, useState } from 'react';

export default function MarketData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/get_latest_quotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({symbols: ["SPY", "GLD", "TLT"]})
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error fetching latest quotes");
      }
    })
    .then(data => {
      setData(data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <p>Ask price for SPY: {data["SPY"].ask_price}</p>
      <p>Ask price for GLD: {data["GLD"].ask_price}</p>
      <p>Ask price for TLT: {data["TLT"].ask_price}</p>
    </div>
  )
}