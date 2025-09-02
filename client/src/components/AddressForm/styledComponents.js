import styled from "styled-components";

export const FormContainer = styled.form`
  max-width: 500px;
  margin: 20px 0;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

export const FormHeading = styled.h3`
  text-align: center;
  margin-bottom: 15px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 3px #007bff;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const SubmitButton = styled.button`
  padding: 8px 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const CancelButton = styled.button`
  padding: 8px 14px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #b02a37;
  }
`;
