import React from 'react'
import { products } from '../products'
import ProductCart from '../components/productCart'

const Home = () => {
  return (
    <div className='homescreen'>

        <div>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 my-5 pt-5 place-content-center'>
            {products.map((product, key) => 
                <ProductCart key={key} data={product}/>
            )}
        </div>
        </div>
    </div>
  )
}

export default Home