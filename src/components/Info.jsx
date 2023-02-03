import React from 'react'
import { AppContext } from '../App'

const Info = ({title, image, description}) => {
  const { setIsCartOpened } = React.useContext(AppContext)
  return (
    <div className='empty-cart'>
        <h1 className='mb-50 mt-50'>{title}</h1>
        <img alt='EmptyCart' src={image}></img>
        <h3 className='mb-50 mt-50'>{description}</h3>
        <button  onClick={() => setIsCartOpened(false)} className="mb-50 mt-50 green-btn back-to-shop-btn"> <img className="arrow" src="/images/arrowleft.svg" alt="arrow" img/>Вернуться назад</button>
    </div>
  )
}
export default Info;