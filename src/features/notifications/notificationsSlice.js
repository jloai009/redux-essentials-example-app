import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { client } from '../../api/client'

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    status: 'initialState',
  },
  reducers: {
    allNotificationsRead(state, action) {
      state.notifications.forEach((notification) => {
        notification.read = true
      })
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications.push(...action.payload)
        state.notifications.sort((a, b) => b.date.localeCompare(a.date))
        state.status = 'Done'
      })
      .addCase(fetchNotifications.pending, (state, action) => {
        state.status = 'Loading'
      })
  },
})

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState, dispatch }) => {
    const allNotifications = selectAllNotifications(getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.data
  }
)

export const { allNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer

export const selectAllNotifications = (state) =>
  state.notifications.notifications

export const selectNotificationsStatus = (state) => state.notifications.status
