import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';
import { urlFor, client } from '../../client';
import { AiFillEye } from 'react-icons/ai';
import {FaGithubAlt} from 'react-icons/fa'

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  return (
    <div className="about-container">
      <div className="about-heading"  style={{textAlign:'center'}}>
        <h2 className="head-text" >
          MY PORTFOLIO 
        </h2>
      </div>
      <div className="app__profiles">

        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={about.title + index}
          >
            <div className= "head-text" style={{justifyItems:'center', fontSize:'27px',margin:'8px auto'}}>{about.title}</div>
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            {/* Wrap the title with an <a> tag */}
            <h2 className="bold-text" style={{ marginTop: 20 }}>
  <a href={about.url1} target="_blank" rel="noopener noreferrer"  >
    <AiFillEye className="eyef">{about.title}</AiFillEye>
  </a>
  <a href={about.url2} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '120px' }}>
    <FaGithubAlt className="eyef"></FaGithubAlt>
  </a>
</h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg'
);






