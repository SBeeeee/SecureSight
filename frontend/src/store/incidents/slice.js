import { createSlice } from "@reduxjs/toolkit";

const initialState={
    unresolved:"",
    resolved:"",
    incidents:[],
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
        },
        setIncidents:(state,action)=>{
            state.incidents=action.payload;
        }
    }

})

export const {setResolved,setUnresolved,setIncidents}=incidentSlice.actions;
export default incidentSlice.reducer;