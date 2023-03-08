// import React, { Component } from 'react'

// export default class Account extends Component {
//   render() {
//     return (
//       <div>Account</div>
//     )
//   }
// }

import React, { useState } from 'react';

function Account() {
  const [data, setData] = useState(null);

  const handleClick = async () => {
    const response = await fetch('/https://paper-api.alpaca.markets');
    const jsonData = await response.json();
    setData(jsonData);
  };

  return (
    <div>
      <button onClick={handleClick}>Get Account Info</button>
      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
export default Account;