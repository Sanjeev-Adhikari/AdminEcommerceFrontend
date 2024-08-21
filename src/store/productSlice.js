import {  createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "components/misc/statuses";
import { APIAuthenticated } from "http";

const productSlice = createSlice({
    name : "products",
    initialState :{

        status : STATUSES.SUCCESS,
        products : null
     
    },
    reducers : {

       setStatus(state,action){
        state.status = action.payload
       },
       setProducts(state,action){
        state.products = action.payload
       },
       deleteProductById(state,action){
        const index = state.products.findIndex(product=>product._id === action.payload.productId)
        state.products.splice(index,1)
       },
       updateProductStatusById(state,action){
        const index = state.products.findIndex(product=>product._id === action.payload.productId)
        if(index !== -1){
            state.products[index] = action.payload.data
        }
       },
       addNewProduct(state,action){
        state.products.push(action.payload)
       }
     
    }
})

export const {addNewProduct, setStatus, setProducts, deleteProductById, updateProductStatusById} = productSlice.actions 

export default productSlice.reducer 

export function addProduct(data){

    return async function addProductThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.post('/products', data, {
                headers : {
                    'Content-type' : 'multipart/form-data' 
                }
            }  )
            dispatch(addNewProduct(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function fetchProducts(){
    return async function fetchProductsThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.get("products/")
            dispatch(setProducts(response.data.data.reverse()))
            console.log(response.data)
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function removeProduct(productId){
    return async function removeProductThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        
        try {
            const response = await APIAuthenticated.delete(`/products/${productId}`)
           
            
            dispatch(deleteProductById({productId}))
            console.log(response, 'rESPONSE')
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function updateProductStatus(productId,productStatus){
    return async function updateProductStatusThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            
            const response = await APIAuthenticated.patch(`/products/status/${productId}`,{productStatus})
          
            dispatch(updateProductStatusById({productId,data : response.data.data}))
            
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function updatePriceAndStock(productId,data){
    return async function updatePriceAndStockThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await APIAuthenticated.patch(`/products/stockprice/${productId}`, data)
            dispatch(updateProductStatusById({productId, data : response.data.data}))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}
