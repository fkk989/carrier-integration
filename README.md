# Carrier Integration Service

---

## ✅ Things Done

- **Standardized domain models**
  - `RateRequest` and `RateQuote` shared across all carriers
  - Separate domain entities for `Address`, `Package`, and `Rate`

- **Carrier abstraction**
  - `Carrier` interface defining a common contract
  - UPS implementation isolated in its own module

- **UPS integration (stubbed)**
  - OAuth authentication flow implemented via `UpsAuthClient`
  - Rate-fetching logic implemented in `UpsCarrier`
  - External HTTP calls stubbed/mocked (no real UPS credentials required)

- **Runtime validation**
  - Zod schemas used to validate incoming `RateRequest` at the service boundary
  - Prevents invalid input from leaking into business logic

- **Testing**
  - Integration-style tests with stubbed HTTP client
  - No real network calls

---

## ⏳ Things Left

- Error handling strategy
  - Centralized error mapping in `ShippingService`
  - Typed, predictable domain errors (validation, unsupported carrier, integration failures)

- Add more exhaustive test coverage for:
  - Carrier failure scenarios
  - Error mapping edge cases

- Minor documentation polish
  - Inline comments in carrier implementations

---

## Things I Would Do With More Time

- **Add more carriers** (e.g. FedEx, DHL) to demonstrate extensibility
- **Response validation**
  - Validate normalized `RateQuote` results using Zod inside carrier implementations

- **Token management enhancements**
  - Shared token cache with concurrency protection (mutex)

- **Persistence layer** (if needed)
  - Optional storage for rate history or caching

---

## Setup

### Install dependencies

```bash
npm install
```

### Run tests

```bash
npm test
```
