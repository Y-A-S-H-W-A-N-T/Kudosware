import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/sidebar.module.css';

function Sidebar() {

  const navigate = useNavigate()

  const Logout = async()=>{
    window.localStorage.removeItem('user')
    navigate('/',{ replace: true })
  }


  return (
    <div className={styles.sidebarContainer}>
      <ul className={styles.sidebarList}>
        <li className={styles.sidebarItem}>
          <Link to="/profile" className={styles.profileLink}>
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
          </Link>
        </li>
        <li className={styles.sidebarItem}>
          <Link to="/jobs" className={styles.sidebarLink}>
            Jobs
          </Link>
        </li>
        <li className={styles.sidebarItem}>
          <Link to="/overview" className={styles.sidebarLink}>
            Overview
          </Link>
        </li>
        <li className={styles.sidebarItem}>
          <Link to="" className={styles.sidebarLink}>
            Help
          </Link>
        </li>
        <li className={styles.sidebarItem}>
          <p className={styles.sidebarLink} onClick={Logout} style={{cursor: 'pointer'}}>
            Logout
          </p>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar