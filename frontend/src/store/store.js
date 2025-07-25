import { configureStore } from '@reduxjs/toolkit';
import incidentReducer from './incidents/slice'
import cameraReducer from './camera/slice'

export const store=configureStore({
    reducer:{
        incident:incidentReducer,
        camera:cameraReducer,
    }
})

export default store;