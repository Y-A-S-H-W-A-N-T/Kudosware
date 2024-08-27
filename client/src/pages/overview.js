import React from 'react';
import Sidebar from './../component/sidebar';
import styles from '../styles/profile.module.css';

function Overview() {


  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profileContent}>
        <h1>Welcome to YourHR</h1>
        <h2>Click on the Profile image on sidebar to navigate to profile page</h2>
      </div>
    </div>
  );
}

export default Overview;