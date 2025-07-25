import { createSlice } from "@reduxjs/toolkit";

const initialState={
    camera:[],
    maincamera:[],
}

const cameraSlice=createSlice({
    name:'camera',
    initialState,
    reducers:{
        setCamera:(state,action)=>{
            state.camera=action.payload;
        },
        setMainCamera:(state,action)=>{
            state.maincamera=action.payload;
        }
    }

})

export const {setCamera,setMainCamera}=cameraSlice.actions;
export default cameraSlice.reducer;