import React, { useEffect, useState } from "react";
import Article from "../component/Article";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, Paper, Snackbar, Stack } from "@mui/material";
import { apiFetch } from "../fetch";
import { Api } from "../api";

/**
 * @typedef {{
 *  id,
    stock_symbol,
    quantity,
    side,
    order_type,
    status,
 * }} Order
 */

const theme = createTheme();

export default function BuyStock(props) {
  const [message, setMessage] = useState("");
  const [accountInfo, setAccountInfo] = useState(null);
  const [openStockBuySnack, setOpenStockBuySnack] = useState({
    isOpen: false,
    message: "",
  });
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    apiFetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((resOrders) => {
        setOrders(resOrders);
      })
      .catch((error) => {
        console.error("Error fetching orders", error);
      });
  };

  const getAccountInfo = () => {
    Api.getAccount()
      .then((res) => {
        console.log({ account: res });
        setAccountInfo(res);
      })
      .catch((error) => {
        console.error("Error getting account info", error);
      });
  };

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

    apiFetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        setOpenStockBuySnack({
          isOpen: true,
          message: "Success: stock purchase was successful",
        });
        fetchOrders();
      })
      .catch((error) => {
        console.error("Error buying stock", error);
        setOpenStockBuySnack({
          isOpen: true,
          message: "Error: stock purchase was unsuccessful",
        });
      });
  };

  useEffect(() => {
    fetchOrders();
    getAccountInfo();
  }, []);

  return (
    <>
      <Stack direction="horizontal" p={{ sm: 5, lg: 15 }} gap={2}>
        {/* purchase form */}
        <Box component={Paper} width={"20%"} xs={{ padding: { md: 10, sm: 5 } }}>
          <Stack gap={2} direction="column" component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} padding={4}>
            <TextField label="Current Balance" value={accountInfo?.cash ?? "NA"} disabled></TextField>
            <TextField label="Buying Power" value={accountInfo?.buying_power ?? "NA"} disabled></TextField>
            <TextField margin="normal" required fullWidth name="symbol" label="symbol" type="text" id="symbol" />
            <TextField margin="normal" required fullWidth name="quantity" label="qty" type="qty" id="qty" />
            <Button type="submit" variant="contained">
              Submit Order
            </Button>
            <Button onClick={getAccountInfo}>get balance</Button>
          </Stack>
        </Box>
        {/* history */}
        <Stack direction="column">
          <h2>History (stocks)</h2>
          <Box component="ul" pt={3}>
            {orders.map((t) => (
              <Box pb={3} component="li" key={t.id} display="flex" flexDirection={"row"} gap={2}>
                <TextField aria-readonly="true" value={t.id} label="Order id"></TextField>
                <TextField aria-readonly="true" value={t.quantity} label="Quantity"></TextField>
                <TextField aria-readonly="true" value={t.stock_symbol} label="Symbol"></TextField>
                <TextField aria-readonly="true" value={t.status} label="Status"></TextField>
                <TextField aria-readonly="true" value={t.date} label="date"></TextField>
              </Box>
            ))}
          </Box>
        </Stack>
      </Stack>
      <Snackbar open={openStockBuySnack.isOpen} autoHideDuration={6000} message={openStockBuySnack.message} />
    </>
  )
};
  