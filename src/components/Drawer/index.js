import React from 'react';
import axios from 'axios';

import Info from '../Info';
import { AppContext } from '../../App';

import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({onClickCloseCart, onRemove, items = [], isCartOpened }) => {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderPlaced, setIsOrderPlaced] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const amount = cartItems.reduce((sum, obj) => obj.price + sum, 0);


  const onClickPlaceOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post("https://63d68d43e60d5743697addea.mockapi.io/orders", {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderPlaced(true);
      setCartItems([]);

      for (let i = 0; i <= cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://63d3f6c18d4e68c14eb6bf8e.mockapi.io/cart/${item.id}`);
        await delay(1000);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

    return (
      <div className={`${styles.overlay} ${isCartOpened ? styles.overlayVisible : ''}`}>
        <div className='drawer'>
          <h2 className="mb-20 d-flex justify-between">Корзина <button onClick={onClickCloseCart} className="remove-btn cu-p">
              <img alt='remove' className="remove-btn" src="/images/removebtn.svg" />
              </button>
            </h2>
            {
              items.length > 0 ?
              (
              <>
                <div className="items">
                {items.map((obj) => (
                <div key={obj.id} className="cart-item d-flex align-center mt-15">
                  <img alt='product' className="mr-15" width="90" height="90" src={obj.imageUrl}/>
                  <div className="mr-20">
                    <p className="mb-5">{obj.name}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <button className="remove-btn" onClick={() => {onRemove(obj.id)}}>
                    <img alt='remove' className="remove-btn" src="/images/removebtn.svg" />
                  </button>
                </div>
                ))} 
                </div>
                <div className="total-price-block">
                  <ul>
                    <li>
                      <span>Итого:</span>
                      <div></div>
                      <b>{amount} руб.</b>
                    </li>
                    <li>
                      <span>Налог 20%:</span>
                      <div></div>
                      <b>{amount / 100 * 20}</b>
                    </li>
                  </ul>
                <button disabled={isLoading} onClick={onClickPlaceOrder} className="green-btn">Оформить заказ <img src="/images/arrow.svg" alt="arrow"></img></button>
                </div>
              </> 
              )
               :
              (
              <Info title={isOrderPlaced ? "Заказ успешно оформлен" : "Корзина пустая"} description={isOrderPlaced ? `Благодарим вас за покупку! Заказ #${orderId} передан в обработку`  : "Добавьте хотя бы один товар, чтобы оформить заказ"} image={isOrderPlaced ? '/images/orderplaced.svg': '/images/empty.svg'}/>
              )
            }
        </div>
      </div>
    );
};

export default Drawer;