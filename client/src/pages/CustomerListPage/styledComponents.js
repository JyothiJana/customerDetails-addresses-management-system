import styled from 'styled-components'
import bgImage from '../../assets/image.jpg'

export const CustomersListContainer=styled.div`
    padding:10px;
    font-family:'roboto';
    background-image: url(${bgImage});
    background-size:cover;
    min-height:100vh;

`

export const CustomerDetailsHeading=styled.h1`
    color:#ffffff;
    font-size:35px;
    font-weight:bold;
    text-align:center;
`
// Wrapper to center the table
export const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto;
  padding: 0 10px; // small padding for mobile
  width: 100%;
`;

// Main table
export const CustomersList = styled.table`
  width: 80%;
  max-width: 1000px;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  color: #333;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 768px) {
    width: 100%;   // full width on tablets/mobiles
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
  &:hover {
    background-color: #e9ecef;
  }
`;

export const TableHeader = styled.th`
  padding: 14px 20px;
  background-color: #2c3e50;
  color: #fff;
  text-align: left;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 10px;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 8px;
  flex-wrap: wrap;
`;

export const PageButton = styled.button`
  background-color: ${(props) => (props.active ? "#4CAF50" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#4CAF50")};
  border: 1px solid #4CAF50;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #4CAF50;
    color: #fff;
  }
`;
export const AddCustomerButton = styled.button`
  padding: 8px 16px;
  font-size: 18px;
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
    font-size: 15px;
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 13px;
    width: 100%;  // button stretches in mobile for touch-friendliness
  }
`;
export const ButtonContainer=styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top:50px;
`

export const FiltersContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  gap: 10px;
  @media screen and (max-width:768px){
  flex-direction:column;
  align-items:center;
  }
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 250px;
  font-size: 14px;
`;

export const SortButton = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 14px;
  @media screen and (max-width:768px){
  width:200px;
  }

  &:hover {
    background-color: #0056b3;
  }
`;
