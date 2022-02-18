import React, { useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'
import classnames from 'classnames'

import { Spinner } from '../../components/Spinner'

import { selectAllUsers } from '../users/usersSlice'

import {
  allNotificationsRead,
  selectNotificationsStatus,
  selectAllNotifications,
  fetchNotifications,
} from './notificationsSlice'

export const NotificationsList = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  const notifications = useSelector(selectAllNotifications)
  const notificationsStatus = useSelector(selectNotificationsStatus)

  if (notificationsStatus === 'initialState') {
    dispatch(fetchNotifications())
  }

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  }, [dispatch])

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown User',
    }

    const notificationClassname = classnames('notification', {
      new: !notification.read,
    })

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section className="notificationList">
      <h2>Notifications</h2>
      {notificationsStatus === 'Done' ? (
        renderedNotifications
      ) : (
        <Spinner text={notificationsStatus}></Spinner>
      )}
    </section>
  )
}
