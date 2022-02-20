import { useSelector } from "react-redux";

import Spinner from "../../../UI/Spinner";

const Bids = () => {
  const zoom = 1;
  const bids = useSelector((state) => state.bids.bids);

  const renderBidRows = () => {
    if (!bids.length) {
      return (
        <div className="order-spinner">
          <Spinner />
        </ div>
      );
    }

    return bids.map(function (row, index) {
      return (
        <tr className="bids-row" key={row.price}>
          <td
            className="order-highlighter"
            style={{
              right: 0,
              background: "rgba(1, 167, 129, 0.3)",
              width: `calc(${
                (
                  (100 * row.total) /
                  bids[bids.length - 1]
                    .total
                ).toFixed(0) * zoom
              }% - 20px)`
            }}
          ></td>
          <td className="text-center">{row.count}</td>
          <td className="text-right">{row.amount}</td>
          <td className="text-right">{row.total}</td>
          <td className="text-right">{row.price}</td>
        </tr>
      );
    });
  };

  return (
    <div className="order-book__table order-book__table--bids">
      <table>
        <thead>
          <tr>
            <th></th>
            <th className="text-center">COUNT</th>
            <th className="text-right">AMOUNT</th>
            <th className="text-right">TOTAL</th>
            <th className="text-right">PRICE</th>
          </tr>
        </thead>
        <tbody>{renderBidRows()}</tbody>
      </table>
    </div>
  );
};

export default Bids;
