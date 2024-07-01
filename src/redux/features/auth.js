import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
// import { toast } from 'react-toastify'

export const loginQuery = createAsyncThunk('auth/login', async (payload) => {
  try {
    const response = await axios.post('/auth/login', payload)
    return response.data
  } catch (e) {
    const axiosError = e.response?.data
    return Promise.reject(axiosError.message)
  }
})

const initialState = {
  name: null,
  isFetching: false,
  token: localStorage.getItem('AUTH_TICKETS_TOKEN') || null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.name = null
      localStorage.clear('token')
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginQuery.fulfilled, (state, action) => {
      //   toast.success('Bienvenido!')
      state.name = action.payload.user.name
      state.isFetching = false
      state.token = action.payload.token
      localStorage.setItem('AUTH_TICKETS_TOKEN', action.payload.token)
    })
    builder.addCase(loginQuery.pending, (state) => {
      state.isFetching = true
    })
    builder.addCase(loginQuery.rejected, (state, action) => {
      state.isFetching = false
      //   toast.error(action.error.message)
    })
  },
})

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions

export default authSlice.reducer
