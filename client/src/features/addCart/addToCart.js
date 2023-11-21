import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {list:[],total:0},
}

export const addToCartSlice = createSlice({
  name: 'addToPanies',
  initialState,
  reducers: {
      setValue(state,action){
const check = state.value.list.findIndex(product=>product._id===action.payload._id)
    if(check!==-1){
      state.value.list[check].quantity += action.payload.quantity
    }else{
      state.value.list.push(action.payload)
    }
    state.value.total=state.value.list.reduce((sum,product)=>sum+ +product?.price*product?.quantity,0)
 },
    updateQuantity(state,action){
  const check = state.value.list.findIndex(product=>product._id===action.payload._id)
      if(check!==-1){
        state.value.list[check].quantity = action.payload.quantity
      }else{
        state.value.list.push(action.payload)
      }
      state.value.total=state.value.list.reduce((sum,product)=>sum+ +product?.price*product?.quantity,0)
  },
  deleteItem(state,action){
    console.log("ff")
      state.value.list=state.value.list.filter(product => product._id !== action.payload._id)
      state.value.total=state.value.list.reduce((sum,product)=>sum+ +product?.price*product?.quantity,0)
  }
}
})
// Action creators are generated for each case reducer function
export const { setValue,updateQuantity,deleteItem } = addToCartSlice.actions

export default addToCartSlice.reducer