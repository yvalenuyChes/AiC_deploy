import { createSlice } from '@reduxjs/toolkit'


const initialState= {
   openCityPagePopup:false
}

export const cityPagePopup = createSlice({
   name:'cityPagePopup',
   initialState,
   reducers:{
      openCityPagePopup: state => {
         state.openCityPagePopup = true
      },
      closeCityPagePopup:state => {
         state.openCityPagePopup = false
      }
   }
})

export const {openCityPagePopup, closeCityPagePopup} = cityPagePopup.actions
export const openCityPagePopupState = state => state.cityPagePopup
export default cityPagePopup.reducer

