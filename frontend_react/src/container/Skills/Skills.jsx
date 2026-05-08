import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';

import './Skills.scss';

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        Skills & Experiences
      </h2>

      <div className="app__skills-container">
        {/* SKILLS SECTION */}
        <motion.div className="app__skills-list">
          {skills?.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{
                  backgroundColor: skill.bgColor,
                }}
              >
                <img
                  src={urlFor(skill.icon)}
                  alt={skill.name}
                />
              </div>

              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* EXPERIENCE SECTION */}
        <motion.div
          className="app__experience-table"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="experience-header">
            <div>Job Title</div>
            <div>Company</div>
            <div>Duration</div>
          </div>

          {experiences?.map((experience) =>
            experience?.works?.map((work) => (
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="experience-row"
                key={`${work.name}-${work.company}`}
                data-tooltip-id={work.name}
              >
                <div className="job-title">
                  {work.name}
                </div>

                <div className="company-name">
                  {work.company}
                </div>

                <div className="duration">
                  {experience.year}
                </div>

                <ReactTooltip
                  id={work.name}
                  place="top"
                  content={work.desc}
                  className="skills-tooltip"
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg'
);
