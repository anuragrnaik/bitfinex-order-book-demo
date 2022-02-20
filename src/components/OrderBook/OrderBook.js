import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import OrderBookHeader from './OrderBookHeader';
import OrderBookBody from './OrderBookBody/OrderBookBody';

import { bidsActions } from '../../store/bidsSlice';
import { offersActions } from '../../store/offersSlice';

import './OrderBook.scss';

const OrderBook = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  const headerClickHandler = () => setCollapsed(!collapsed);

  const subscribeToAll = useCallback(() => {
    const ws = new WebSocket('wss://api.bitfinex.com/ws/2');
    let payloadData = {};

    ws.addEventListener('open', (ev) => {
      let bookRequest = JSON.stringify({
        event: 'subscribe',
        channel: 'book',
        symbol: 'tBTCUSD',
        prec: "P0"
      });

      ws.send(bookRequest);
    });

    ws.addEventListener('message', (ev) => {
      payloadData = JSON.parse(ev.data);
        if (!payloadData.event && Array.isArray(payloadData[1]) && payloadData[1].length === 3) {
          let tmpbookOrderRow = {
            price: parseFloat(payloadData[1][0]).toFixed(1),
            count: payloadData[1][1],
            amount: parseFloat(payloadData[1][2]).toFixed(2),
            total: parseFloat(0).toFixed(2)
          }
          if (tmpbookOrderRow.amount > 0) {
            dispatch(bidsActions.update({
              type: 'UPDATE',
              newBids: tmpbookOrderRow
            }));
          }
          else{
            dispatch(offersActions.update({
              type: 'UPDATE',
              newOffers: tmpbookOrderRow
            }));
          }
        }
    });
  }, [dispatch]);

  useEffect(() => {
    subscribeToAll()
  }, [subscribeToAll]);

  return (
    <div className="order-book">
      <OrderBookHeader headerClickFn={headerClickHandler} collapsed={collapsed} />
      <OrderBookBody collapsed={collapsed}/>
    </div>
  );
};

export default OrderBook;