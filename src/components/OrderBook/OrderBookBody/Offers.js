import { useSelector } from "react-redux";

import Spinner from "../../../UI/Spinner";

const Offers = () => {
  const zoom = 1;
  const offers = useSelector((state) => state.offers.offers);

  const renderAskRows = () => {
    if (!offers.length) {
      return (
        <div className="order-spinner">
          <Spinner />
        </div>
      );
    }

    return offers.map(function (row, index) {
      return (
        <tr key={row.price}>
          <td
            className="order-highlighter"
            style={{
              background: "rgba(228, 75, 68, 0.3)",
              width: `calc(${
                (
                  (100 * row.total) /
                  offers[offers.length - 1]
                    .total
                ).toFixed(0) * zoom
              }% - 20px)`
            }}
          ></td>
          <td className="text-right">{row.price}</td>
          <td className="text-right">{row.total}</td>
          <td className="text-right">{Math.abs(row.amount)}</td>
          <td className="text-center">{row.count}</td>
        </tr>
      );
    });
  }

  return (
    <div className="order-book__table order-book__table--offers">
      <table>
        <thead>
          <tr>
            <th></th>
            <th className="text-right" style={{ width: "50px" }}>
              PRICE
            </th>
            <th className="text-right">TOTAL</th>
            <th className="text-right">AMOUNT</th>
            <th className="text-center">COUNT</th>
          </tr>
        </thead>
        <tbody>{renderAskRows()}</tbody>
      </table>
    </div>
  );
}

export default Offers;
