import React, { useCallback, useEffect, useState } from "react";
import Article from "../component/Article";
import { Api } from "../api";
import { Stack } from "@mui/system";
import { Button, TextField } from "@mui/material";

export default function Trade() {
  const [account, setAccount] = useState(null);
  const [positions, setPositions] = useState([]);
  const [sellQty, setSellQty] = useState("");

  const getPositions = useCallback(() => {
    Api.getPositions()
      .then(setPositions)
      .catch((error) => console.error("Error getting positions:", error));
  }, []);

  const getAccount = useCallback(() => {
    Api.getAccount()
      .then(setAccount)
      .catch((error) => console.error("Error getting account:", error));
  }, []);

  const sellPosition = (qty, symbol) => {
    Api.sellPosition(qty, symbol)
      .then((response) => {
        if (response.success) {
          getPositions();
          setSellQty("");
          console.log("Successfully sold a position.");
        } else {
          alert(response.message);
        }
      })
      .catch((error) => console.error("Error selling position:", error));
  };
  

  useEffect(() => {
    getAccount();
    getPositions();
  }, [getAccount, getPositions]);

    return (
    <Stack padding={10} gap={5}>
      {/* balance */}
      <Stack direction="row">
        <TextField label="Current Balance" value={account?.cash}></TextField>
        <Button onClick={getPositions}>reload</Button>
      </Stack>

      {/* list of positions */}
      <Stack direction="column" gap={5}>
        {positions?.map((position) => {
          return (
            <Stack direction="row" gap={2}>
              {Object.entries(position).map(([key, value]) => (
                <TextField value={value} label={key} key={key} disabled></TextField>
              ))}
              <TextField label="Sell Qty" value={sellQty} onChange={(e) => setSellQty(e.target.valu)}></TextField>
              <Button onClick={() => sellPosition(sellQty, position.symbol)}>sell</Button>
            </Stack>
          );
        })}
      </Stack>
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
        
