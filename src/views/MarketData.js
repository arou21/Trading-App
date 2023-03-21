import React, { useState } from 'react';

export default function MarketData() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/get_latest_quotes?query=${query}`);
      if (!response.ok) {
        throw new Error("Error fetching latest quotes");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return (
      <div>
        <input type="text" value={query} onChange={handleInputChange} />
        <button onClick={handleSearch}>Search</button>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <input type="text" value={query} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
      <p>Ask price for {query}: {data?.[query]?.ask_price}</p>
    </div>
  );
}


// import React, { useEffect, useState } from 'react';

// export default function MarketData() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch("http://localhost:5000/api/get_latest_quotes", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({symbols: ["SPY", "GLD", "TLT"]})
//         });
//         if (!response.ok) {
//           throw new Error("Error fetching latest quotes");
//         }
//         const data = await response.json();
//         setData(data);
//       } catch (error) {
//         setError(error.message);
//       }
//     }
//     fetchData();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>
//   }

//   if (!data) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div>
//       <p>Ask price for SPY: {data?.SPY?.ask_price}</p>
//       <p>Ask price for GLD: {data?.GLD?.ask_price}</p>
//       <p>Ask price for TLT: {data?.TLT?.ask_price}</p>
//     </div>
//   )
// }
// import React, { useEffect, useState } from 'react';

// export default function MarketData() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/get_latest_quotes", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({symbols: ["SPY", "GLD", "TLT"]})
//     })
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error("Error fetching latest quotes");
//       }
//     })
//     .then(data => {
//       setData(data);
//     })
//     .catch(error => {
//       console.log(error);
//     });
//   }, []);

//   if (!data) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div>
//       <p>Ask price for SPY: {data["SPY"].ask_price}</p>
//       <p>Ask price for GLD: {data["GLD"].ask_price}</p>
//       <p>Ask price for TLT: {data["TLT"].ask_price}</p>
//     </div>
//   )
// }