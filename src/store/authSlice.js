import { createSlice } from "@reduxjs/toolkit";



import { STATUSES } from "components/misc/statuses";
import { APIAuthenticated } from "http";
import { API } from "http";



const authSlice = createSlice({
    name : "auth",
    initialState : {
        data : [],
        status : STATUSES.SUCCESS,
        token : ""
    },
    reducers : {
        setUser(state,action){
            state.data = action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        },
        setToken(state,action){
            state.token = action.payload
        },
        logOut(state,action){
            state.data = []
            state.token = null
            state.state = STATUSES.SUCCESS
        }
    },
    
});
export const {setUser, setStatus, setToken, logOut} = authSlice.actions
export default authSlice.reducer




export function loginUser(data){
    return async function loginUserThunk(dispatch){
       dispatch(setStatus(STATUSES.LOADING))
        try{
        const response = await API.post("/auth/login",data)
        
    
         dispatch(setUser(response.data.data))
         dispatch(setToken(response.data.token))
         dispatch(setStatus(STATUSES.SUCCESS))
         localStorage.setItem('token', response.data.token)
            window.location.href = '/admin'
       
        }catch (error){
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
            
        }
    }
    
}

export function fetchProfile(){
    return async function fetchProfileThunk(dispatch){
       dispatch(setStatus(STATUSES.LOADING))
        try{
        const response = await APIAuthenticated.get("/profile/")
         dispatch(setUser(response.data.data))
         dispatch(setStatus(STATUSES.SUCCESS))
        }catch (error){
            console.log(error)
            
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
    
}












