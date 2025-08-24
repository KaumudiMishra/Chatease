import { useEffect, useState } from 'react';
import { db } from '../firebase'; // Adjust your Firebase path
import { ref, onChildAdded } from 'firebase/database';

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const notifRef = ref(db, 'notifications');

    onChildAdded(notifRef, (snapshot) => {
      const newNotif = snapshot.val();
      setNotifications((prev) => [newNotif, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });
  }, []);

  const handleBellClick = () => {
    setOpen(!open);
    if (!open) setUnreadCount(0); // reset count when dropdown opens
  };

  return (
    <div className="notification-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
      <div className="notification-icon" onClick={handleBellClick} style={{ cursor: 'pointer', fontSize: '24px' }}>
        🔔
        {unreadCount > 0 && (
          <span
            className="notif-count"
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              background: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '4px 8px',
              fontSize: '12px'
            }}
          >
            {unreadCount}
          </span>
        )}
      </div>

      {open && (
        <div
          className="notification-dropdown"
          style={{
            position: 'absolute',
            top: '35px',
            right: '0',
            background: '#fff',
            border: '1px solid #ccc',
            width: '300px',
            maxHeight: '400px',
            overflowY: 'auto',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: 1000
          }}
        >
          {notifications.length === 0 ? (
            <div className="no-notifs" style={{ padding: '10px' }}>No notifications</div>
          ) : (
            notifications.map((n, i) => (
              <div key={i} className="notification-item" style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                <strong>{n.number}</strong><br />
                <small>Joined: {new Date(n.joinedAt).toLocaleString()}</small><br />
                <span>{n.message}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
