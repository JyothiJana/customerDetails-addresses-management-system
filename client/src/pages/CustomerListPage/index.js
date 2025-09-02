import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CustomerList from "../../components/CustomerList";
import CustomerForm from "../../components/CustomerForm";
import {
  CustomersListContainer,
  CustomerDetailsHeading,
  TableWrapper,
  CustomersList,
  TableRow,
  TableHeader,
  PaginationContainer,
  PageButton,
  AddCustomerButton,
  ButtonContainer,
  SearchInput,
  SortButton,
  FiltersContainer
} from "./styledComponents";

const CustomerListPage = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("ASC");

  // Fetch customers function
  const fetchCustomers = useCallback(() => {
    axios
      .get("http://localhost:5000/api/customers", {
        params: {
          page,
          limit,
          search,
          sortBy: "first_name",
          order: sortOrder
        },
      })
      .then((response) => {
        const numberedCustomers = response.data.customers.map((cust, index) => ({
          ...cust,
          displayId: (page - 1) * limit + index + 1,
        }));

        setCustomers(numberedCustomers);
        setTotal(response.data.total);
      })
      .catch((error) => console.error("Error fetching customers:", error));
  }, [page, limit, search, sortOrder]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const totalPages = Math.ceil(total / limit);

  const handleAddCustomerClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchCustomers();
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // reset to first page when searching
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
  };

  return (
    <CustomersListContainer>
      <CustomerDetailsHeading>Customers Details</CustomerDetailsHeading>

      {showForm ? (
        <CustomerForm onClose={handleFormClose} />
      ) : (
        <>
          {/* Search & Sort */}
          <FiltersContainer>
            <SearchInput
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={handleSearchChange}
            />
            <SortButton onClick={toggleSortOrder}>
              Sort by First Name ({sortOrder})
            </SortButton>
          </FiltersContainer>

          <TableWrapper>
            <CustomersList>
              <thead>
                <TableRow>
                  <TableHeader>S.No.</TableHeader>
                  <TableHeader>First Name</TableHeader>
                  <TableHeader>Last Name</TableHeader>
                  <TableHeader>Phone</TableHeader>
                  <TableHeader>View</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {customers.map((each) => (
                  <CustomerList
                    key={each.id}
                    customer={each}
                    displayId={each.displayId}
                    refreshList={fetchCustomers}
                  />
                ))}
              </tbody>
            </CustomersList>
          </TableWrapper>

          {/* Pagination */}
          <PaginationContainer>
            <PageButton
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </PageButton>

            {[...Array(totalPages)].map((_, i) => (
              <PageButton
                key={i}
                onClick={() => setPage(i + 1)}
                active={page === i + 1}
              >
                {i + 1}
              </PageButton>
            ))}

            <PageButton
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </PageButton>
          </PaginationContainer>

          <ButtonContainer>
            <AddCustomerButton onClick={handleAddCustomerClick}>
              Add Customer
            </AddCustomerButton>
          </ButtonContainer>
        </>
      )}
    </CustomersListContainer>
  );
};

export default CustomerListPage;
