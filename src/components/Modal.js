import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import './Modal.css';

function Modal({
	isVisible,
	content,
	style,
	onClose,
	closeBtnColor = 'black',
}) {
	if (!isVisible) return null;
	return (
		<>
			<div className={`modal-overlay`}></div>
			<div className={`modal poke-full-card`} style={style}>
				<Button
					className="close-button"
					onClick={() => {
						onClose();
						isVisible = false;
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
