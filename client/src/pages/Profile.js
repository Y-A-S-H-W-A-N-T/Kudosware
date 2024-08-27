import React, { useRef, useState } from 'react';
import Sidebar from './../component/sidebar';
import styles from '../styles/profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faFilePdf, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import LOGO from '../component/logo/user.png'
import { storage, ref, uploadBytesResumable, getDownloadURL } from '../Firebase/config'
import axios from 'axios';

function Profile() {
  const user = JSON.parse(window.localStorage.getItem('user')) || {};
  const fileInputRef = useRef(null)

  const [loading,setLoading] = useState(false)

  const profilePicture = ()=>{
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }



  // uploading profile picture in Firebase Cloud and fetching Metadata
  const uploadPicture = async(e)=>{
    setLoading(true)
    const storageRef = ref(storage, `profileImage/${user.firstName}`);
        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Monitor progress, e.g., display upload progress, setLoading = true
            },
            (error) => {
                console.error("Upload failed:", error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                storePFP(downloadURL)
            }
        )
  }

  // Storing Profile picture in Employee database

  const storePFP = async(URL)=>{
    await axios.post('/employee/pfp', { profileImage : URL, email: user.email })
    .then((res)=>{
      if(res.data.status === 200){
        setLoading(false)
        window.localStorage.setItem('user',JSON.stringify(res.data.user))
      }
      window.location.reload()
    })
  } 

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profileContent}>
        <div className={styles.profileHeader}>
          <img src={user.profileImage || LOGO} className={styles.profileImage} alt=''  />
          {loading? <p>Loading...</p> : <></>}
          <button className={styles.editButton} onClick={profilePicture}>
            <FontAwesomeIcon icon={faUserEdit} />
          </button>
          <input 
            type="file" 
            accept="image/*" 
            onChange={uploadPicture} 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
          />
        </div>
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{user.firstName || 'Player'} {user.lastName || 'One'}</h2>
          <p className={styles.userEmail}>Email: {user.email || 'johndoe@example.com'}</p>
          <p className={styles.userEmail}>College : {user.college}</p>
          <p className={styles.userEmail}>Branch : {user.branch}</p>
          <p className={styles.userEmail}>Specialization : {user.specialization}</p>
          <p className={styles.userPhone}><FontAwesomeIcon icon={faPhone} /> {user.phoneNumber || 'N/A'}</p>
          {user.resume && (
            <a href={user.resume} className={styles.resumeLink} download target='_blank' rel="noreferrer">
              Resume <FontAwesomeIcon icon={faFilePdf} />
            </a>
          )}
          {user.githubLink && <a href={user.githubLink || '#'} className={styles.githubLink} target='_black' rel="noreferrer">
            <FontAwesomeIcon icon={faGithub} /> GitHub
          </a>}
        </div>
      </div>
    </div>
  );
}

export default Profile;