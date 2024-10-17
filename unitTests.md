## Tests that should eventually be added

### 1. **Unit Tests for `CustomerService`**

- **Test `getAllCustomers()`**

  - Mock the `PrismaService` to return a list of customers.
  - Ensure the method returns the expected list of customers.

- **Test `createCustomer()`**

  - Mock the `PrismaService` to ensure a new customer is created with valid data.
  - Ensure the customer creation process works with valid data.

- **Test `checkCustomerExists()`**
  - Test for a valid customer ID where the customer exists.
  - Test for a non-existent customer ID and ensure it throws a `NotFoundException`.

### 2. **Unit Tests for `SpecialOfferService`**

- **Test `getAllSpecialOffers()`**

  - Mock the `PrismaService` to return a list of special offers.
  - Ensure the method returns the correct list of special offers.

- **Test `createSpecialOffer()`**

  - Mock the `PrismaService` to ensure a new special offer is created with valid data.
  - Test that invalid or missing data causes appropriate errors.

- **Test `checkOfferExists()`**
  - Test for a valid offer ID and ensure the special offer exists.
  - Test for a non-existent offer ID and ensure it throws a `NotFoundException`.

### 3. **Unit Tests for `VoucherService`**

- **Test `generateVoucher()`**

  - Mock customer and offer existence checks (from `CustomerService` and `SpecialOfferService`).
  - Mock `PrismaService` to ensure that voucher code generation works correctly.
  - Test for valid voucher generation including proper linking of customer, special offer, and expiration date.

- **Test `redeemVoucher()`**

  - Test for a valid voucher code redemption by mocking `PrismaService` to return a matching voucher that hasn’t been used and is not expired.
  - Ensure that the voucher is correctly marked as used and the date of usage is set.
  - Test for an invalid or expired voucher and ensure it throws a `BadRequestException`.

- **Test `getCustomerVouchers()`**

  - Mock `PrismaService` to return a list of valid, unexpired vouchers for a given customer email.
  - Test for a customer with no valid vouchers and ensure it returns an empty list.

- **Test `generateVoucherCode()`**

  - Ensure that the method generates voucher codes of the required length (8 characters) and format.
  - Test that it generates unique codes when called repeatedly.

- **Test `generateUniqueVoucherCode()`**
  - Mock `PrismaService` to check if a voucher code exists and ensure the method generates a unique voucher code after multiple attempts if there are collisions.

### 4. **Unit Tests for `CustomerController`**

- **Test `getCustomers()`**

  - Mock `CustomerService` to return a list of customers.
  - Ensure the controller returns the correct response for the `GET` request.

- **Test `createCustomer()`**
  - Mock `CustomerService` to create a customer when valid data is passed.
  - Ensure that the controller handles valid input correctly and returns a `201 Created` response.

### 5. **Unit Tests for `SpecialOfferController`**

- **Test `getAllSpecialOffers()`**

  - Mock `SpecialOfferService` to return a list of special offers.
  - Ensure the controller returns the correct response.

- **Test `createSpecialOffer()`**
  - Mock `SpecialOfferService` to create a special offer with valid data.
  - Ensure the controller handles valid input correctly and returns the appropriate response.

### 6. **Unit Tests for `VoucherController`**

- **Test `generateVoucher()`**

  - Mock `VoucherService` to generate a voucher.
  - Ensure the controller returns the correct response for a successful voucher generation.

- **Test `redeemVoucher()`**

  - Mock `VoucherService` to redeem a voucher.
  - Ensure the controller handles a valid voucher code redemption request correctly.
  - Ensure the controller returns an appropriate error response when an invalid voucher code is provided.

- **Test `getCustomerVouchers()`**
  - Mock `VoucherService` to return a list of customer vouchers.
  - Ensure the controller returns the correct response for valid customer vouchers.

### 7. **Edge Case Tests**

- **Test voucher generation with an invalid customer ID or offer ID.**

  - Ensure that if the customer or offer does not exist, the service throws the appropriate `NotFoundException`.

- **Test redeeming a voucher that is already used.**

  - Ensure the system throws an error if a voucher is already marked as used.

- **Test for expired vouchers.**

  - Ensure that expired vouchers cannot be redeemed, and the appropriate error is thrown.

- **Test generating vouchers with invalid data.**
  - Ensure that the system throws validation errors when required data is missing or malformed.

### 8. **Miscellaneous Tests**

- **Test API rate-limiting (if added to endpoints).**

  - Ensure that rate-limiting (if configured in the system) behaves correctly by simulating multiple requests and checking that excess requests are blocked.

- **Test database transactions.**
  - Ensure that the database transactions in voucher generation and voucher redemption work as expected and rollback changes when an error occurs.
