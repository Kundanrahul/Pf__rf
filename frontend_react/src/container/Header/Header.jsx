import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { AppWrap } from '../../wrapper';
import { images } from '../../constants';
import './Header.scss';
import { useState,useEffect } from 'react';
import { client } from '../../client';
import {AiFillFilePdf} from 'react-icons/ai';

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

function Header() {

  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    client
      .fetch('*[_type == "webPage"][0].pdfFile.asset->url')
      .then((url) => {
        setPdfUrl(url);
      })
      .catch((error) => {
        console.error('Error fetching PDF:', error);
      });
  }, []);
  return (
    <div className="app__header app__flex">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span>🙋‍♂️</span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hey there!, I am</p>
              <h1 className="head-text" style={{fontSize:'30px'}}>RAHUL KUNDAN</h1>
            </div>
          </div>
    <div class="tag-cmp app__flex">
        <p class="p-text moving-gradient">Smart Contract Developer</p>
        <br />
        <p class="p-text" style={{textAlign:'center'}}>And</p><br />
        <p class="p-text moving-gradient">Full Stack Web Developer</p>
    </div>

{pdfUrl && (
  <div className="tag-cmp app__flex">
    <p >
      <span className='pdfnew'  style={{fontSize:'20px'}}>RESUME</span>
    </p>
    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download>
      <AiFillFilePdf style={{fontSize:'30px'}} /><i className="fa fa-file-pdf-o" aria-hidden="true"></i>
    </a>
  </div>
)}

        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__header-img"
      >
        <img className='prof' src={images.backimg} alt="profile_bg" />
        <motion.img
          animate={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          src={images.circle}
          alt="profile_circle"
          className="overlay_circle"
        />
      </motion.div>

      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="app__header-circles"
      >
        {[images.nodejs, images.mongo, images.react].map((circle, index) => (
          <div className="circle-cmp app__flex" key={`circle-${index}`}>
            <img src={circle} alt="profile_bg" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default AppWrap(memo(Header), 'home');
