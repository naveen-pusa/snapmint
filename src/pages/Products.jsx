import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'

function Products() {

  const [product, setproduct] = useState([])
  const [category,setCategory]=useState('')
  const [categoryList,setCategoryList]=useState([])
  const [Search,setSearch]= useState('')
  

  useEffect(() => {
    async function Api() {
      let { data } = await axios.get('https://dummyjson.com/products')
      console.log(data);
      setproduct(data.products)
    }
    Api()
  }, [])

  useEffect(()=>{
    async function ListApis() {
      let url;

      if(category){
        url=`https://dummyjson.com/products/category/${category}`
      }else if(Search){
      url=`https://dummyjson.com/products/search/${Search}`
      }else{
        url=`https://dummyjson.com/products?limt=200`
      }
      
    }
    ListApis()
  })

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
                <mark>price=${item.price}</mark>
              </div>
            )
          }
        </div>
      </div>

    </>
  )
}

export default Products
