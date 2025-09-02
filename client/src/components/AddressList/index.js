import React from "react";
import { AddressListContainer, AddressItem, AddressUl } from "./styledComponents";

const AddressList = ({ addresses }) => {
  if (!addresses || addresses.length === 0) {
    return <AddressListContainer>N/A</AddressListContainer>;
  }

  return (
    <AddressListContainer>
      <AddressUl>
        {addresses.map((addr) => (
          <AddressItem key={addr.id}>
            {addr.address_details}, {addr.city}, {addr.state} - {addr.pin_code}
          </AddressItem>
        ))}
      </AddressUl>
    </AddressListContainer>
  )
}
export default AddressList