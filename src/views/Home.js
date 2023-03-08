import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  const handleClick = async () => {
    const res = await fetch('https://api.alpaca.markets');
    const jsonData = await res.json();
    setData(jsonData);
    console.log(jsonData);   
  }

  return (
    <div>
      <h1>API Example</h1>
      <button onClick={handleClick}>Get Data</button>
      <div>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  );
}

// export default App;

// import React, { useState } from 'react';

// function App() {
//   const [data, setData] = useState(null);

//   const handleClick = async () => {
//     const res = await fetch('https://api.alpaca.markets');
//     const jsonData = await res.json();
//     setData(jsonData);
//     console.log(jsonData);
    
//   }

//   return (
//     <div>
//       <button onClick={handleClick}>Get AAPL Chart Data</button>
//       {data && (
//         <div>
//           <h2>{data.ticker}</h2>
//           <p>Open: {data.results[0].o}</p>
//           <p>Close: {data.results[0].c}</p>
//           <p>High: {data.results[0].h}</p>
//           <p>Low: {data.results[0].l}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
// import React from 'react'

// export default function Home() {
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = 'http://localhost:5000/trade/get_polygon_data'
//     const options = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json"
//       }
//     }
  
//     try {
//       const res = await fetch(url, options);
//       const success = res.status === 200;
//       const data = await res.json();

//       if (success) {
//         console.log("Data received:", data);
//       } else {
//         console.error("Error:", data);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }

//   return (
//     <div>
//       Home
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   )
// }

// import React from 'react'

// export default function Home() {
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
  
  
//     const url = 'http://localhost:5000/trade/chartdata'
//     const options = {
//       method: "GET",
     
//     //   body: JSON.stringify(reqBody),
//     //   headers: {
//     //     "Content-Type": 'application/json'
//     //   }
//     }
//     console.log(options)
  
  
//     const res = await fetch(url, options);
//     const success = res.status == 200
//     const data = await res.json()
//     if (success) {
//       console.log(data)
      
      
//     }
  
//   }
//   return (
//     <div>Home
//       <button onClick={handleSubmit}>Submit</button>

//     </div>
    
//   )
// }

