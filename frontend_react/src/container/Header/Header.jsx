import React, { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppWrap } from '../../wrapper';
import { images } from '../../constants';
import './Header.scss';
import { client } from '../../client';
import { AiFillFilePdf } from 'react-icons/ai';

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
      {/* LEFT SECTION */}
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

              <h1
                className="head-text"
                style={{ fontSize: '30px' }}
              >
                RAHUL KUNDAN
              </h1>
            </div>
          </div>

          <div className="tag-cmp app__flex">
            <p className="p-text moving-gradient">
              Security Aware DeFi Developer
            </p>

            <br />

            <p
              className="p-text"
              style={{ textAlign: 'center' }}
            >
              And
            </p>

            <br />

            <p className="p-text moving-gradient">
              Full Stack Web Developer
            </p>
          </div>

          {pdfUrl && (
            <div className="tag-cmp app__flex">
              <p>
                <span
                  className="pdfnew"
                  style={{ fontSize: '20px' }}
                >
                  RESUME
                </span>
              </p>

              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <AiFillFilePdf
                  style={{ fontSize: '30px' }}
                />
              </a>
            </div>
          )}
        </div>
      </motion.div>

      {/* CENTER IMAGE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delayChildren: 0.5,
        }}
        className="app__header-img"
      >
        <motion.img
          animate={{ scale: [0, 1] }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
          src={images.backimg}
          alt="profile"
          className="profile-img"
        />
      </motion.div>

      {/* RIGHT TECH CIRCLES */}
      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="app__header-circles"
      >
        {[images.nodejs, images.mongo, images.react].map(
          (circle, index) => (
            <div
              className="circle-cmp app__flex"
              key={`circle-${index}`}
            >
              <img src={circle} alt="tech" />
            </div>
          )
        )}
      </motion.div>
    </div>
  );
}

export default AppWrap(memo(Header), 'home');
