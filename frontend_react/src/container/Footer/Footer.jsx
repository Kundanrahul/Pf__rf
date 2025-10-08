import React, { useState } from 'react';
import { SiGeeksforgeeks } from 'react-icons/si';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const showSuccessNotification = (message) => {
    setNotification({ type: 'success', message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const showErrorNotification = (message) => {
    setNotification({ type: 'error', message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      showSuccessNotification('Form submitted successfully');
    } catch (error) {
      console.error(error);
      showErrorNotification('An error occurred while submitting the form');
    }
  };

  return (
    <>
      <h2 className="head-text" style={{ color: 'lightsalmon' }}>
        CONTACT ME
      </h2>
      <h5 className="bold-text" style={{ color: 'lightcoral' }}>
        Reach me out.
      </h5>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href="mailto:rahulkundan60@gmail.com" className="p-text">
            rahulkundan60@gmail.com
          </a>
        </div>
        {/* <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="tel:+91 7051194859" className="p-text">
          </a>
        </div> */}
      </div>

      {/* Form for collecting user data */}
      <form onSubmit={handleSubmit} className="app__contact-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          required
        />
        <button type="submit" className="app__submit-button">
          SEND MESSAGE
        </button>
      </form>

      {notification && (
  <div className={`notification ${notification.type}  active`}>
    <p className="notification-message">{notification.message}</p>
  </div>
)}

      <div className="app__socialmobo">
        <div>
          <a href="https://github.com/Kundanrahul">
            <AiFillGithub />
          </a>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/rahul-kundan-63b4b3248/">
            <AiFillLinkedin />
          </a>
        </div>
        <div>
          <a target="_blank" href="https://auth.geeksforgeeks.org/user/rahulkundan/">
            <SiGeeksforgeeks />
          </a>
        </div>
      </div>
    </>
  );
};

export default AppWrap(MotionWrap(Footer, 'app__footer'), 'contact', 'app__whitebg');


