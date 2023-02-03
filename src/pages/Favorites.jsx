import React from "react";
import Card from "../components/Card";
import { AppContext } from "../App";

function Favorites ({ onAddToFavorite }) {
  const { favoritesItems } = React.useContext(AppContext)
    return(
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Избранное</h1>
        </div>
        <div className="products">
          {favoritesItems
            .map((item) => (
              <Card
                key={item.name}    
                favorited={true}
                onAddToFavorite={onAddToFavorite}
                {...item}
              />
            ))}
        </div>
      </div>
      
    )
};
export default Favorites;