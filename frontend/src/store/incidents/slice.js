import { createSlice } from "@reduxjs/toolkit";

const initialState={
    unresolved:"",
    resolved:"",
}

const incidentSlice=createSlice({
    name:'incidents',
    initialState,
    reducers:{
        setResolved:(state,action)=>{
            state.resolved=action.payload;
        },
        setUnresolved:(state,action)=>{
            state.unresolved=action.payload;
        }
    }

})

export const {setResolved,setUnresolved}=incidentSlice.actions;
export default incidentSlice.reducer;