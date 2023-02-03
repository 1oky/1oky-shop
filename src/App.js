import React from "react";
import './index.scss'
import Header from "./components/Header";
import Drawer from "./components/Drawer/index";
import axios from 'axios'
import { Route } from 'react-router-dom';
import Favorites from "./pages/Favorites";
import Account from "./pages/Account";
import Home from "./pages/Home";

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [isCartOpened, setIsCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [favoritesItems, setFavoritesItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResp, favRsp, itemsResp] = await Promise.all([
          axios.get('https://63d3f6c18d4e68c14eb6bf8e.mockapi.io/cart'),
          axios.get('https://63d68d43e60d5743697addea.mockapi.io/favorites'),
          axios.get('https://63d3f6c18d4e68c14eb6bf8e.mockapi.io/items'),
        ])
        setIsLoading(false);
        
        setCartItems(cartResp.data);
        setFavoritesItems(favRsp.data);
        setItems(itemsResp.data);
      }
      catch (error) {
        alert('Ошибка при запросе данных');
      }
    }
    fetchData();
  }, []);
  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://63d3f6c18d4e68c14eb6bf8e.mockapi.io/cart/${findItem.id}`);
      } else {
        const { data } = await axios.post('https://63d3f6c18d4e68c14eb6bf8e.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Произошла ошибка при добавлении товара в корзину');
    }
  }
  const onRemoveCartItem = (id) => {
    axios.delete(`https://63d3f6c18d4e68c14eb6bf8e.mockapi.io/cart/${id}`)
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    })
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  }
  const onAddToFavorite = async (obj) => {
    try {
      if (favoritesItems.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://63d68d43e60d5743697addea.mockapi.io/favorites/${obj.id}`);
        setFavoritesItems(prev => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        setFavoritesItems((prev) => [...prev, obj])
        const { data } = await axios.post('https://63d68d43e60d5743697addea.mockapi.io/favorites', obj);
        setFavoritesItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id,
            }
          }
          return item;
        }));
      }
    } catch(error) {
      alert('Не удалось добавить товар в избранное');
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  };
  
  const isItemAddedToCart = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  };

  return (
    <AppContext.Provider value={{ items, cartItems, favoritesItems, isItemAddedToCart, setIsCartOpened, setCartItems }}>
      <div className="wrapper clear">
        <Drawer items={cartItems} onClickCloseCart={() => setIsCartOpened(false)} onRemove={onRemoveCartItem} isCartOpened={isCartOpened}/>
        <Header onClickCart={() => setIsCartOpened(true)}/>
        <Route path='/favorites'>
          <Favorites 
            onAddToFavorite={onAddToFavorite}
          />
        </Route>
        <Route path='/' exact>
          <Home 
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>
        <Route path='/account' exact>
          <Account />
        </Route>
      </div>
    </AppContext.Provider>
  );
};

export default App;
