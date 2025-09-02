import styled from "styled-components";
import bgImage from '../../assets/image.jpg'
export const DetailsContainer = styled.div`
  font-family:'roboto';
  background-image: url(${bgImage});
  background-size:cover;
  min-height:100vh;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DetailsHeading = styled.h1`
  font-size: 28px;
  color: #ffffff;
  margin-bottom: 20px;
`;

export const DetailsCard = styled.div`
  background: #f9f9f9;
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

export const DetailRow = styled.p`
  font-size: 18px;
  margin: 10px 0;
  color: #444;
`;

export const BackButton = styled.button`
  margin-top: 50px;
  padding: 10px 16px;
  font-size: 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;
export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

export const ActionButton = styled.button`
  padding: 8px 14px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: #fff;
  background-color: ${(props) => (props.delete ? "#dc3545" : "#007bff")};
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.delete ? "#b02a37" : "#0056b3")};
  }
`;