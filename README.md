# Carrier Integration Service

---

🧠 Design Decisions
**Standardized Domain First**
The core design decision was to define carrier-agnostic domain models (RateRequest, RateQuote) and treat them as the source of truth. All carriers adapt to and from these models, ensuring the service API remains stable even as new carriers are added.

**Clear Carrier Boundary**
Each carrier implements a common Carrier interface. This isolates carrier-specific logic (authentication, request/response mapping) and allows new carriers to be added without changing the ShippingService.

**Validation at the Boundary**
Runtime validation using Zod is performed at the ShippingService boundary. This ensures invalid input is rejected early and downstream logic can safely rely on validated domain data.

**Stubbed External Integrations**
Real HTTP calls to UPS are stubbed in tests. This keeps tests deterministic, fast, and focused on business logic rather than network behavior, which aligns with the assessment requirements.

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
