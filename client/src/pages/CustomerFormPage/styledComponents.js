import styled from "styled-components";

// Container for the entire form
export const FormContainer = styled.form`
  width: 450px;
  max-width: 90%;
  margin: 50px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Heading of the form
export const FormHeading = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #333333;
  margin-bottom: 10px;
`;

// Input fields
export const InputField = styled.input`
  padding: 12px 15px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.4);
  }
`;

// Container for buttons
export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

// Submit button
export const SubmitButton = styled.button`
  flex: 1;
  padding: 12px 0;
  background-color: #007bff;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #0056b3;
  }
`;

// Cancel button
export const CancelButton = styled.button`
  flex: 1;
  padding: 12px 0;
  background-color: #f0f0f0;
  color: #333;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #dcdcdc;
  }
`;
