import React from 'react';
import PropTypes from 'prop-types';
import './blue_dot.css';

const BlueDot = ({ idx, index }) => (
	<div className={`dot ${idx === index ? 'blue' : 'none'}`} />
);

BlueDot.propTypes = {
	idx: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
};

export default BlueDot;
