import React, { useCallback, useEffect, useState } from "react";
import { Api } from "../api";
import { Stack } from "@mui/system";
import { Button, TextField } from "@mui/material";

export default function Trade() {
  const [account, setAccount] = useState(null);
  const [positions, setPositions] = useState([]);
  const [sellQty, setSellQty] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getPositions = useCallback(() => Api.getPositions().then(setPositions), []);
  const getAccount = useCallback(() => Api.getAccount().then(setAccount), []);

  const handleSellQtyChange = (event) => {
    setSellQty(event.target.value);
  };

  const handleSellPosition = (qty, symbol) => {
    setErrorMessage("");
    if (isNaN(qty) || qty <= 0) {
      setErrorMessage("Please enter a valid quantity.");
      return;
    }
    if (qty > symbol.position_qty) {
      setErrorMessage("You do not have enough shares to sell.");
      return;
    }
    Api.sellPosition(qty, symbol.symbol).then(() => {
      getPositions();
      getAccount();
    });
  };

  useEffect(() => {
    getPositions();
    getAccount();
  }, []);

  return (
    <Stack padding={10} gap={5}>
      {/* balance */}
      <Stack direction="row">
        <TextField label="Current Balance" value={account?.cash}></TextField>
        <Button onClick={getPositions}>Reload</Button>
      </Stack>

      {/* list of positions */}
      <Stack direction="column" gap={5}>
        {positions?.map((position) => (
          <Stack direction="row" gap={2} key={position.symbol}>
            {Object.entries(position).map(([key, value]) => (
              <TextField value={value} label={key} key={key} disabled></TextField>
            ))}
            <TextField label="Sell Qty" value={sellQty} onChange={handleSellQtyChange}></TextField>
            <Button onClick={() => handleSellPosition(sellQty, position)}>Sell</Button>
          </Stack>
        ))}
      </Stack>

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </Stack>
  );
}




// import React, { Component, useCallback, useEffect, useState } from "react";
// import Article from "../component/Article";

// import { Api } from "../api";
// import { Stack } from "@mui/system";
// import { Button, TextField } from "@mui/material";

// export default function Trade() {
//   const [account, setAccount] = useState(/** @type {IAccount} */ (null));
//   const [positions, setPositions] = useState(/** @type {IPosition[]}*/ ([]));
//   const [sellQty, setSellQty] = useState(null);

//   const getPositions = useCallback(() => Api.getPositions().then(setPositions), []);
//   const getAccount = useCallback(() => Api.getAccount().then(setAccount), []);

//   const sellPosition = (qty,symbol)=>{
//     //make sll request to backend
//     Api.sellPosition(qty,symbol)
//     .then(getPositions())
//   }

//   useEffect(() => {
//     getPositions();
//     getAccount();
//   }, []);

//   return (
//     <Stack padding={10} gap={5}>
//       {/* balance */}
//       <Stack direction="row">
//         <TextField label="Current Balance" value={account?.cash}></TextField>
//         <Button onClick={getPositions}>reload</Button>
//       </Stack>

//       {/* list of positions */}
//       <Stack direction="column" gap={5}>
//         {positions?.map((position) => {
//           return (
//             <Stack direction="row" gap={2}>
//               {Object.entries(position).map(([key, value]) => (
//                 <TextField value={value} label={key} key={key} disabled></TextField>
//               ))}
//               <TextField label="Sell Qty" value={sellQty} onChange={(e) => setSellQty(e.target.valu)}></TextField>
//               <Button onClick={() => sellPosition(sellQty, position.symbol)}>sell</Button>
//             </Stack>
//           );
//         })}
//       </Stack>
//     </Stack>
//   );
// }

