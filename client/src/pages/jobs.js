import React from 'react';
import Sidebar from './../component/sidebar';
import styles from '../styles/profile.module.css';
import { jobs } from '../component/dummyJobs';

function Jobs() {
  
  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profileContent}>
            {jobs.map(job => (
              <div key={job.id} className={styles.jobItem}>
                <div>
                  <div className={styles.jobTitle}>{job.title}</div>
                  <div className={styles.jobDetails}>
                    <div className={styles.jobLocation}>{job.location}</div>
                    <div className={styles.jobSalary}>{job.salary}</div>
                    <div className={styles.jobType}>{job.type}</div>
                  </div>
                </div>
              <button className={styles.jobButton}>Apply Now</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Jobs