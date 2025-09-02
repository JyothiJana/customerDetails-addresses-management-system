import styled from 'styled-components'

export const CustomerItem=styled.tr`
    color:#ffffff;
    font-family:'roboto';
`
export const TableData = styled.td`
  padding: 12px 20px;
  font-size: 15px;
  color: #333;
  word-break: break-word; // prevents long text overflow

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 10px 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 10px;
  }
`;

export const ShowButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  background: #2c3e50;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #1abc9c;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }

  &:active {
    transform: scale(0.96);
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 12px;
    width: 100%;  // button stretches in mobile for touch-friendliness
  }
`;

