import { apiFetch } from "./fetch";
const base = "http://localhost:5000/";

const toJson = (res) => res.json();

export const Api = {
  /** @return {Promise<IAccount>} */
  getAccount: function () {
    return apiFetch(base + "account").then(toJson);
  },

  /** @return {Promise<IPosition[]>} */
  getPositions: function () {
    return apiFetch(base + "positions").then(toJson);
  },

  sellPosition: (qty,symbol)=>{
    return apiFetch(base + "sell-position").then(toJson)
  }
};
