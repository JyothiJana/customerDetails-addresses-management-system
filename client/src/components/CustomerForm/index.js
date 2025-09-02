import { useState } from "react";
import axios from "axios";
import {
  FormContainer,
  FormHeading,
  InputField,
  SubmitButton,
  CancelButton,
  ButtonGroup,
} from "./styledComponents";

const CustomerForm = ({ onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !phoneNumber) {
      setError("First name, last name, and phone number are required.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/customers", {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      });
      onClose(); // close the form and refresh customer list
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormHeading>Add New Customer</FormHeading>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <InputField
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <InputField
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <InputField
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <ButtonGroup>
        <SubmitButton type="submit">Add Customer</SubmitButton>
        <CancelButton type="button" onClick={onClose}>
          Cancel
        </CancelButton>
      </ButtonGroup>
    </FormContainer>
  );
};

export default CustomerForm;
