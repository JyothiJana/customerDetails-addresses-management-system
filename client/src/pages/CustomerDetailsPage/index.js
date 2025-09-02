import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import AddressList from '../../components/AddressList';
import AddressForm from '../../components/AddressForm'; // Address form component

import {
  DetailsContainer,
  DetailsHeading,
  DetailsCard,
  DetailRow,
  BackButton,
  ActionButtons,
  ActionButton
} from "./styledComponents";

const CustomerDetailsPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Fetch customer details - useCallback to fix ESLint warning
  const fetchCustomer = useCallback(() => {
    axios
      .get(`http://localhost:5000/api/customers/${id}`)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });
  }, [id]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  // Delete customer
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      axios
        .delete(`http://localhost:5000/api/customers/${id}`)
        .then(() => {
          alert("Customer deleted successfully!");
          navigate("/customers"); // redirect to customer list
        })
        .catch((err) => console.error(err));
    }
  };

  // Show address form
  const handleAddAddress = () => {
    setShowAddressForm(true);
  };

  // Close address form after adding
  const handleAddressFormClose = () => {
    setShowAddressForm(false);
    fetchCustomer(); // refresh customer details to show new address
  };

  if (!customer) {
    return <p>Loading customer details...</p>;
  }

  return (
    <DetailsContainer>
      <DetailsHeading>Customer Details</DetailsHeading>

      <DetailsCard>
        <DetailRow><strong>ID:</strong> {customer.id}</DetailRow>
        <DetailRow><strong>First Name:</strong> {customer.first_name}</DetailRow>
        <DetailRow><strong>Last Name:</strong> {customer.last_name}</DetailRow>
        <DetailRow><strong>Phone:</strong> {customer.phone_number}</DetailRow>
        <DetailRow>
          <strong>Addresses:</strong>
          <AddressList addresses={customer.address} />
        </DetailRow>

        {/* Action buttons */}
        <ActionButtons>
          <ActionButton onClick={() => navigate(`/customers/edit/${id}`)}>Edit</ActionButton>
          <ActionButton onClick={handleDelete} delete>Delete</ActionButton>
          <ActionButton onClick={handleAddAddress}>Add Address</ActionButton>
        </ActionButtons>

        {/* Address Form */}
        {showAddressForm && (
          <AddressForm customerId={id} onClose={handleAddressFormClose} />
        )}
      </DetailsCard>

      <Link to="/customers">
        <BackButton>← Back to Customers</BackButton>
      </Link>
    </DetailsContainer>
  );
};

export default CustomerDetailsPage;
