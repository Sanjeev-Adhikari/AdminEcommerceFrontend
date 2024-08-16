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
    
    }
})

export const {setStatus, setProducts} = productSlice.actions 

export default productSlice.reducer 




export function fetchProducts(){
    return async function fetchProductsThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.get("products/")
            dispatch(setProducts(response.data.data))
            console.log(response.data)
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

