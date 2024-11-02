import { styled } from "styled-components";

export const Select = styled.select`
	width: 100%;
	padding: 8px 12px;
	border: 1px solid #e2e8f0;
	border-radius: 4px;
	font-size: 14px;
	color: #4a5568;
	outline: none;

	&:focus {
		border-color: #63b3ed;
	}
`;