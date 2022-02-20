import './OrderBookBody.scss';

const OrderBookBody = ({collapsed}) => {
  return <div className={`order-book__body ${collapsed ? 'collapsed' : ''}`}></div>;
};

export default OrderBookBody;
