import './OrderBookBody.scss';

import Bids from './Bids';
import Offers from './Offers';

const OrderBookBody = ({collapsed}) => {
  return (
    <div className={`order-book__body ${collapsed ? 'collapsed' : ''}`}>
      <div className="order-book__content">
        <Bids />
        <Offers />
      </div>
    </div>
  );
};

export default OrderBookBody;
