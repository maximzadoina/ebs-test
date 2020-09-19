import React,{useContext} from 'react'
import {CartContext} from '../../providers/cart/cart.provider'
import ProductsTable from '../../components/ProductsTable/ProductsTable.component'

const CartPage=()=>{
    const{cartProducts}=useContext(CartContext)
    return(
        <div>
            <ProductsTable hasQuantity={true} productsList={cartProducts}/>
        </div>
    )
}

export default CartPage;