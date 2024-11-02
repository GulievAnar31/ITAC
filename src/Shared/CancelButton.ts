import { styled } from "styled-components";

export const CancelButton = styled.button`
	background-color: #e2e8f0;
	color: #4a5568;
	padding: 8px 16px;
	border: none;
	border-radius: 4px;
	font-size: 14px;
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background-color: #cbd5e0;
	}
`;