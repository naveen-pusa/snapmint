import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'

function Products() {

  const [product, setproduct] = useState([])

  useEffect(() => {
    async function Api() {
      let { data } = await axios.get('https://dummyjson.com/products')
      console.log(data.products);
      setproduct(data.products)
    }
    Api()
  }, [])

  return (
    <>
      <div className="container">
        <div className="row">

          {
            product.map(item =>
              <div className='col-md-3  border border-danger mx-5 my-3 rounded border p-3'  key={item.id}>
                <h3>{item.title}</h3>
                <img src={item.thumbnail} alt="" />
                <p>{item.description}</p>
                <mark>{item.price}</mark>
              </div>
            )
          }
        </div>
      </div>

    </>
  )
}

export default Products
