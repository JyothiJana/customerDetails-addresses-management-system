import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FormContainer,
  FormHeading,
  InputField,
  SubmitButton,
  CancelButton,
  ButtonGroup,
} from "./styledComponents";

const CustomerFormPage = () => {
  const { id } = useParams(); // customer ID to edit
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  // Fetch existing customer data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/customers/${id}`)
      .then((res) => {
        const customer = res.data;
        setFirstName(customer.first_name);
        setLastName(customer.last_name);
        setPhoneNumber(customer.phone_number);
      })
      .catch(() => setError("Failed to load customer data"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !phoneNumber) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/customers/${id}`, {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      });
      navigate(`/customers/${id}`); // go back to customer details
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormHeading>Edit Customer</FormHeading>
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
        <SubmitButton type="submit">Update</SubmitButton>
        <CancelButton type="button" onClick={() => navigate(`/customers/${id}`)}>
          Cancel
        </CancelButton>
      </ButtonGroup>
    </FormContainer>
  );
};

export default CustomerFormPage;
