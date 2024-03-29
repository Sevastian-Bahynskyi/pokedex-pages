import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import '../styles/Modal.css';
import { useEffect, useState } from 'react';

function Modal({
	isVisible,
	content,
	style,
	onClose = () => {},
	closeBtnColor = 'black',
}) {
	const [isVisibleState, setIsVisibleState] = useState(isVisible);

	if (!isVisibleState) return null;
	return (
		<>
			<div className={`modal-overlay`}></div>
			<div className={`modal poke-full-card`} style={style}>
				<Button
					className="close-button"
					onClick={() => {
						onClose();
						setIsVisibleState(false);
					}}
					style={{ color: closeBtnColor }}
				>
					<CloseIcon />
				</Button>
				{content}
			</div>
		</>
	);
}

export default Modal;
