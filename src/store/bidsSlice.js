import { createSlice } from "@reduxjs/toolkit";

function getCachedBids() {
  const store = window.sessionStorage.getItem('store');
  return store && store.bids ? JSON.parse(store.bids.bids) : [];
}

const initialState = {
  bids: getCachedBids(),
};

const bidsSlice = createSlice({
  name: "bids",
  initialState,
  reducers: {
    update: (state, {payload}) => {
      const newState = payload.newBids;
      let priceExists = false;

      if (state.bids.length > 0) {
        state.bids.forEach((bid, index) => {
          if (
            bid.price &&
            newState.price &&
            bid.price === newState.price
          ) {
            priceExists = true;
            bid.count = newState.count;
            bid.amount = newState.amount;
          }
        });
      }

      if (priceExists === true) {
        priceExists = false;
        state.bids = state.bids.slice();
      } else {
        let newStateCombined = [...(state.bids || []), newState];

        // sort by highest to lowest
        newStateCombined.sort(function (a, b) {
          return b.price - a.price;
        });

        if (newStateCombined.length > 50) {
          newStateCombined.pop();
        }

        if (newStateCombined.length > 0) {
          newStateCombined.forEach((row, index) => {
            if (!row || row.count === 0) {
              newStateCombined.splice(index, 1);
            }
          });

          newStateCombined.forEach((row, index) => {
            if (
              newStateCombined[index - 1] &&
              newStateCombined[index - 1].total
            ) {
              newStateCombined[index].total = (
                parseFloat(newStateCombined[index - 1].total) +
                parseFloat(row.amount)
              ).toFixed(2);
            } else {
              newStateCombined[index].total = parseFloat(
                row.amount
              ).toFixed(2);
            }
          });
        }

        state.bids = newStateCombined;
      }
    },
  },
});

export const bidsActions = bidsSlice.actions;
export default bidsSlice;
