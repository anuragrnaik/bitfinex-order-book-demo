import { createSlice } from "@reduxjs/toolkit";

function getCachedoffers() {
  const store = window.sessionStorage.getItem('store');
  return store && store.offers ? JSON.parse(store.offers.offers) : [];
}

const initialState = {
  offers: getCachedoffers(),
};

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    update: (state, {payload}) => {
      let newOffer = payload.newOffers;

      if (!!Math.abs(newOffer.amount)) {
        let priceExists = false;

        if (state.offers.length > 0) {
          state.offers.forEach((offer, index) => {
            if (
              offer.price &&
              newOffer.price &&
              offer.price === newOffer.price
            ) {
              priceExists = true;
              offer.count = newOffer.count;
              offer.amount = newOffer.amount;
            }
          });
        }

        if (priceExists === true) {
          priceExists = false;
          state.offers = state.offers.slice();
        } else {
          let newStateCombined = [...state.offers, newOffer];

          // sort by lowest to highest
          newStateCombined.sort(function (a, b) {
            return a.price - b.price;
          });

          if (newStateCombined.length > 50) {
            newStateCombined.pop();
          }

          if (newStateCombined.length > 0) {
            newStateCombined.forEach((row, index) => {
              if (!row || row.count === 0) {
                newStateCombined.splice(index, 1);
              }

              if (!row || row.amount > 0) {
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
                  Math.abs(parseFloat(row.amount))
                ).toFixed(2);
              } else {
                newStateCombined[index].total = Math.abs(
                  parseFloat(row.amount).toFixed(2)
                );
              }
            });
          }

          state.offers = newStateCombined;
        }
      }
    },
  },
});

export const offersActions = offersSlice.actions;
export default offersSlice;
