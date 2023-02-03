import axios from "axios";
import React from "react";
import Card from "../components/Card";

function Account () {
  const [orders, setOrders] = React.useState([])
  const [isLoading, setIsloading] = React.useState(false)
  
  React.useEffect(() => {
    async function fetchData() {
      try {
        const ordersData = await axios.get('https://63d68d43e60d5743697addea.mockapi.io/orders')
        console.log(ordersData)
        setOrders(ordersData.data.reduce((prev, obj) => [...prev, ...obj.items], []))
      } catch (error) {
        console.log(error);
        alert('Во время загрузки заказов произошла ошибка')
      }
    }
    fetchData()
  }, [])

    return(
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Мои заказы</h1>
        </div>
        <div className="products">
          {(isLoading ? [...Array(8)] : orders)
            .map((item) => (
              <Card
                key={item.id}
                loading={isLoading}    
                {...item}
              />
            ))}
        </div>
      </div>
    )
}
export default Account;