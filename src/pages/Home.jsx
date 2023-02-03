import Card from "../components/Card";
import React from "react";


function Home ({
  items,
  searchValue, 
  setSearchValue, 
  onChangeSearchInput, 
  onAddToFavorite, 
  onAddToCart, 
  isLoading,
}) {

  const renderItems = () => {
    const filteredItems = items.filter((item) => 
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
            <Card
              key={index}
              addToCartBtn={(item) => onAddToCart(item)}
              onAddToFavorite={(obj) => onAddToFavorite(obj)}
              loading={isLoading}    
              {...item}
            />
          ))
    }
    return (
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все товары'}</h1>
          <div className="search-block d-flex">
            <img src='/images/search.svg' alt='Search'/>
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
            {searchValue && <button onClick={() => setSearchValue('')} className="clear-search-btn cu-p">
              <img alt='clear' className="clear-search-btn" src="/images/removebtn.svg" />
            </button>}
          </div>
        </div>
        <div className="products">
          {renderItems()}
        </div>
      </div>
    )
}
export default Home;