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

const AddressForm = ({ customerId, onClose }) => {
  const [addressDetails, setAddressDetails] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!addressDetails || !city || !state || !pinCode) {
      setError("All address fields are required.");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/customers/${customerId}/addresses`, {
        address_details: addressDetails,
        city,
        state,
        pin_code: pinCode,
      });

      onClose(); // Close the form and refresh address list
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormHeading>Add New Address</FormHeading>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <InputField
        type="text"
        placeholder="Address Details"
        value={addressDetails}
        onChange={(e) => setAddressDetails(e.target.value)}
      />

      <InputField
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <InputField
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />

      <InputField
        type="text"
        placeholder="Pin Code"
        value={pinCode}
        onChange={(e) => setPinCode(e.target.value)}
      />

      <ButtonGroup>
        <SubmitButton type="submit">Add Address</SubmitButton>
        <CancelButton type="button" onClick={onClose}>
          Cancel
        </CancelButton>
      </ButtonGroup>
    </FormContainer>
  );
};

export default AddressForm;
