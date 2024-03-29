import { useState, useEffect } from 'react';
import '../styles/App.css';
import Modal from '../components/Modal';

function AboutPage() {
	const content = (
		<>
			<h1>About</h1>
			<label>About</label>
		</>
	);
	return (
		<>
			<Modal isVisible={true} content={content}></Modal>
		</>
	);
}

export default AboutPage;
