import React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

const Header = (props) => {
  const { cartItems } = React.useContext(AppContext)
  const amount = cartItems.reduce((sum, obj) => obj.price + sum, 0);
    return (
       <header className="d-flex justify-between align-center p-40">
          <Link to='/'>
            <div className="d-flex align-center">
              <div className="headerInfo">
                <img alt='logo' width='80' height='80' src="/images/lolo.png" />
                <p>Streetwear clothes by 1oky</p>
              </div>
           </div>
          </Link>
        <ul className="d-flex">
          <li onClick={props.onClickCart} className="mr-30 cu-p">
            <img width="18" height="18" src="/images/Group.svg" alt='Корзина'/>
            <span>{amount} руб.</span>
          </li>
          <li>
            <Link to='/favorites'>
              <img className='cu-p' width="18" height="18" src="/images/favorites.svg" alt='Избранное'></img>
            </Link>
            <Link to='/account'>
              <img width="18" height="18" src="/images/Union.svg" alt='Кабинет' />
            </Link>
          </li>
        </ul>
      </header>
    );
};

export default Header;