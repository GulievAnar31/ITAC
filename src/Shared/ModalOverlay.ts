import { styled } from "styled-components";

export const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	align-items: center;
	justify-content: center;
`;