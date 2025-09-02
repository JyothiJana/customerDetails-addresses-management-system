import styled from "styled-components";

// Container for the form
export const FormContainer = styled.form`
  max-width: 500px;
  margin: 20px auto;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// Form heading
export const FormHeading = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 22px;
  color: #333;
`;

// Input fields
export const InputField = styled.input`
  width: 90%;
  padding: 12px 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 3px #007bff;
  }
`;

// Button group container
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

// Submit button
export const SubmitButton = styled.button`
  padding: 10px 18px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

// Cancel button
export const CancelButton = styled.button`
  padding: 10px 18px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #b02a37;
  }
`;
