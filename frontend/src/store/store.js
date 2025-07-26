import { configureStore } from '@reduxjs/toolkit';
import incidentReducer from './incidents/slice'
import cameraReducer from './camera/slice'
import userReducer from './user/slice'

export const store=configureStore({
    reducer:{
        incident:incidentReducer,
        camera:cameraReducer,
        user:userReducer,
    }
})

export default store;