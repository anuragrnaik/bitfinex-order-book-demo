import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faBell,
  faChevronRight,
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
  faGear
} from '@fortawesome/free-solid-svg-icons'

import './OrderBookHeader.scss';

const OrderBookHeader = (props) => {
  return (
    <div className="order-book__header">
      <div onClick={props.headerClickFn}>
        <i className="order-book__header__icon">
          <FontAwesomeIcon icon={faChevronRight} className={`${!props.collapsed ? 'fa-rotate-90' : ''}`} />
        </i>
        <span className="order-book__header__title">Order Book</span>
        <span className="order-book__header__title--conv">BTC/USD</span>
      </div>
      <div>
        <span className="order-book__header__options">
          <button type="button">
            .0
            <sub>
              <FontAwesomeIcon icon={faArrowLeft} />
            </sub>
          </button>
          <button disabled type="button">
            .00
            <sub>
              <FontAwesomeIcon icon={faArrowRight} />
            </sub>
          </button>
          <button type="button" onClick={(ev) => ev.preventDefault() }>
            <FontAwesomeIcon icon={faBell} />
          </button>
          <button onClick={(ev) => ev.preventDefault() }>
            <FontAwesomeIcon icon={faGear} />
          </button>
          <button type="button">
            <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
          </button>
          <button type="button">
            <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
          </button>
        </span>
      </div>
    </div>
  );
};

export default OrderBookHeader;
