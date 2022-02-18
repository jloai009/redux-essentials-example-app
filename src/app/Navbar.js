import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  fetchNotifications,
  allNotificationsRead,
} from '../features/notifications/notificationsSlice'

export const Navbar = () => {
  const dispatch = useDispatch()

  const fetchNewNotifications = () => {
    if (window.location.pathname === '/notifications') {
      dispatch(allNotificationsRead())
    }
    dispatch(fetchNotifications())
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">Notifications</Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
