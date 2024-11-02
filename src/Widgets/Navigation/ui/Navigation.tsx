import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  display: flex;
  gap: 20px; 
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  
  &:hover {
    color: #4CAF50;
  }
`;

export const Navigation = () => (
	<Nav>
		<StyledLink to="/products">Products</StyledLink>
		<StyledLink to="/price-plans">Price Plans</StyledLink>
		<StyledLink to="/pages">Pages</StyledLink>
	</Nav>
);
