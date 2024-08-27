import React, { useState } from 'react';
import styles from '../styles/signin.module.css';
import { storage, ref, uploadBytesResumable, getDownloadURL } from '../Firebase/config'
import axios from 'axios'
import { useNavigate } from 'react-router'


const SignIN = () => {
    const navigate = useNavigate()

    const [loading,setLoading] = useState(false)
    const [step, setStep] = useState(1)
    const [User, setUser] = useState({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        college: '',
        branch: '',
        specialization: '',
        resume: null,
        phoneNumber: '',
        githubLink: ''
    })
    const [errors, setErrors] = useState({
        email: '',
        phoneNumber: ''
    })

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/i;
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...User,
            [name]: value,
        });
        validateField(name, value)
    };

    const handleFileChange = (e) => {
        setUser({
            ...User,
            resume: e.target.files[0],
        });
    };

    const nextStep = () => {
        if (isStepValid()) {
            setStep(step + 1);
        } else {
            alert('Please fill all required fields.')
        }
    };
    
    const prevStep = () => {
        setStep(step - 1)
    };

    const handleSubmit = async(e) => {
        setLoading(true)
        e.preventDefault()
        uploadPDF() // this function will also call storeUser inside it.
    }

    const storeUser = async(URL)=>{
        await axios.post('/employee/signup',{
            User: User,
            resume: URL
        })
        .then((res)=>{
            if(res.data.status === 200){
                setLoading(false)
                window.localStorage.setItem('user',JSON.stringify(res.data.user)) // test this
                navigate('/profile',{ replace: true })
            }
            if(res.data.status === 404){
                alert("Error in Signin")
            }
        })
    }

    const uploadPDF = async () => {
        const storageRef = ref(storage, `resumes/${User.firstName}`);
        const uploadTask = uploadBytesResumable(storageRef, User.resume);
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
                storeUser(downloadURL)
            }
        )
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'email':
                setErrors({
                    ...errors,
                    email: emailRegex.test(value) ? '' : 'Invalid email address. Only Gmail, Hotmail, or Yahoo are allowed.',
                });
                break;
            case 'phoneNumber':
                setErrors({
                    ...errors,
                    phoneNumber: phoneRegex.test(value) ? '' : 'Phome number must be 10 digits.',
                });
                break;
            default:
                break;
        }
    };

    const isStepValid = () => {
        switch (step) {
            case 1:
                return User.firstName && User.lastName && User.password
            case 2:
                return !errors.email && !errors.phoneNumber && User.email && User.phoneNumber
            case 3:
                return User.college && User.branch && User.specialization
            case 4:
                return User.resume !== null
            case 5:
                return User.githubLink
            default:
                return false
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.progress}>
                Step {step} of 5
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                {step === 1 && (
                    <>
                        <h2 className={styles.title}>Personal Information</h2>
                        <input
                            className={styles.input}
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={User.firstName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className={styles.input}
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={User.lastName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className={styles.input}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={User.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className={styles.button}
                            onClick={nextStep}
                            disabled={!isStepValid()}
                        >
                            Next
                        </button>
                    </>
                )}
                {step === 2 && (
                    <>
                        <h2 className={styles.title}>Contact Information</h2>
                        <input
                            className={styles.input}
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={User.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                        <input
                            className={styles.input}
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={User.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                        {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber}</p>}
                        <div className={styles.navigation}>
                            <button
                                type="button"
                                className={styles.button}
                                onClick={prevStep}
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                className={styles.button}
                                onClick={nextStep}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
                {step === 3 && (
                    <>
                        <h2 className={styles.title}>Education</h2>
                        <input
                            className={styles.input}
                            type="text"
                            name="college"
                            placeholder="College"
                            value={User.college}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className={styles.input}
                            type="text"
                            name="branch"
                            placeholder="Branch"
                            value={User.branch}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className={styles.input}
                            type="text"
                            name="specialization"
                            placeholder="Specialization"
                            value={User.specialization}
                            onChange={handleChange}
                            required
                        />
                        <div className={styles.navigation}>
                            <button
                                type="button"
                                className={styles.button}
                                onClick={prevStep}
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                className={styles.button}
                                onClick={nextStep}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
                {step === 4 && (
                    <>
                        <h2 className={styles.title}>Upload Resume</h2>
                        <input
                            className={styles.input}
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            required
                        />
                        <div className={styles.navigation}>
                            <button
                                type="button"
                                className={styles.button}
                                onClick={prevStep}
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                className={styles.button}
                                onClick={nextStep}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
                {step === 5 && (
                    <>
                        <h2 className={styles.title}>Portfolio</h2>
                        <input
                            className={styles.input}
                            type="url"
                            name="githubLink"
                            placeholder="GitHub/Portfolio Link"
                            value={User.githubLink}
                            onChange={handleChange}
                            required
                        />
                        <div className={styles.navigation}>
                            <button
                                type="button"
                                className={styles.button}
                                onClick={prevStep}
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className={styles.button}
                                disabled={!isStepValid()}
                            >
                                {loading? 'Loading' : 'Submit'}
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default SignIN;