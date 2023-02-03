import React from 'react';
import ContentLoader from "react-content-loader"
import { AppContext } from '../App';


const Card = ({id,
  name,
  price, 
  imageUrl, 
  addToCartBtn, 
  onAddToFavorite, 
  favorited = false, 
  added = false,
  loading = false,
  }) => {

  const { isItemAddedToCart } = React.useContext(AppContext)
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const obj = {id, parentId: id, name, price, imageUrl}

  const onClickAdd = () => {
    addToCartBtn(obj);
  }
  const onClickFavorite = () => {
    onAddToFavorite(obj);
    setIsFavorite(!isFavorite);
  }
    return (
      <div className="product-card">
        {loading  ? 
        <ContentLoader 
          speed={2}
          width={150}
          height={270}
          viewBox="0 0 150 270"
          backgroundColor="#353535"
          foregroundColor="#616161"
        >
          <circle cx="31" cy="31" r="15" /> 
          <rect x="0" y="0" rx="10" ry="10" width="150" height="150" /> 
          <rect x="5" y="181" rx="5" ry="5" width="103" height="11" /> 
          <rect x="4" y="158" rx="5" ry="5" width="133" height="11" /> 
          <rect x="6" y="220" rx="5" ry="5" width="80" height="24" /> 
          <rect x="114" y="215" rx="10" ry="10" width="32" height="32" /> 
          <rect x="132" y="241" rx="0" ry="0" width="0" height="1" />
        </ContentLoader>
        : <>
          <button className="cu-p" onClick={onClickFavorite}>
            {onAddToFavorite && <img src={isFavorite ? '/images/like.svg' : '/images/unlike.svg'} alt='favorite'/>}
          </button>
          <img width="230" height="230" src={imageUrl} alt='product'/>
          <h5>{name}</h5>
          <div className="d-flex justify-between mr-30">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price} руб.</b>
          </div>
          <button>
            {addToCartBtn && <img alt='Add'
            onClick={onClickAdd}
            className='add-to-cart'
            src={isItemAddedToCart(id) ? "/images/added.svg" : "/images/addbtn.svg"}/>}
          </button>
          </div>
        </>}
      </div>
    );
};

export default Card;