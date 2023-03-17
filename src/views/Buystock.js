import React, { Component, useState } from "react";
import Article from "../component/Article";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, Paper, Snackbar, Stack } from "@mui/material";

/**
 * @typedef {{
 *  id,
    symbol,
    qty,
    side,
    type,
    status,
 * }} Order
 */
const theme = createTheme();
export default function Buystock(props) {
  const [message, setMessage] = useState("");
  const [openStockBuySnack, setOpenStockBuySnack] = useState({ isOpen: false, message: "" });
  const [orders, setOrders] = useState(/** @type {Order[]} */ ([]));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const symbol = e.target[0].value;
    const quantity = e.target[2].value;

    const reqBody = {
      symbol: symbol,
      quantity: quantity,
    };
    console.log(reqBody);

    const url = "http://localhost:5000/api/buystock";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(props.user.email + ":" + props.user.password),
      },
      body: JSON.stringify(reqBody),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        setOpenStockBuySnack({ isOpen: true, message: "Success: stock purchase was successful" });
      })
      .catch((error) => {
        // show snack with failure message
        setOpenStockBuySnack({ isOpen: false, message: "Error: stock purchase was unsuccessful" });
      });
  };

  return (
    <>
      <Stack direction="horizontal" p={{ sm: 5, lg: 15 }} gap={2}>
        {/* purchase form */}

        <Paper width={"30%"} xs={{ padding: { lg: 10, sm: 5 } }}>
          <Stack gap={2} direction="column" component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth name="symbol" label="symbol" type="text" id="symbol" />
            <TextField margin="normal" required fullWidth name="quantity" label="qty" type="qty" id="qty" />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </Paper>

        {/* history */}
        <Stack direction="column">
          <h2>History (stocks)</h2>

          <Box component="ul">
            {orders.map((t) => (
              <Box component="li" key={t.id} display="flex" flexDirection={"row"} gap={2}>
                <TextField disabled value={t.id} label="Order id"></TextField>
                <TextField disabled value={t.qty} label="Quantity"></TextField>
                <TextField disabled value={t.symbol} label="Symbol"></TextField>
                <TextField disabled value={t.status} label="Status"></TextField>
                <TextField disabled value={t.date} label="date"></TextField>
              </Box>
            ))}
          </Box>
        </Stack>
      </Stack>
      <Snackbar open={openStockBuySnack.isOpen} autoHideDuration={6000} message={openStockBuySnack.message} />
    </>
  );
}
