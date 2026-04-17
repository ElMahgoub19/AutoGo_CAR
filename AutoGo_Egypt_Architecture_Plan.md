# AutoGo Software Architecture & Implementation Plan (Egypt Localization)
*Version: Graduation Project Prototype*

## 1. Executive Summary & Project Scope
**AutoGo** is a smart vehicle maintenance and emergency service mobile application. This architecture plan represents the foundational blueprint for developing the system as a **Graduation Project Prototype**, specifically localized for the **Egyptian Market**.

**Key Constraints for Graduation Prototype:**
- Financial transactions will be **mocked** (simulated UI, simulated backend approval).
- OTP SMS will be **mocked/bypassed** during development to save costs.
- Production-level compliances (like strict PCI DSS) are out of scope.
- Driver application functionality can be simulated using simple API endpoints or a basic web interface/admin panel to save mobile development time.

---

## 2. Target Market & Localization Parameters

### 2.1 Geographic Focus
- **Country:** Egypt
- **Country Code:** `+20`

### 2.2 Data Validation Requirements
- All user and driver phone numbers must enforce the **+20 prefix**.
- Telephone validation algorithms must enforce exactly **11 digits** following the `+20` (e.g., `+20 101 234 5678`).

### 2.3 Financials
- **Primary Currency:** Egyptian Pound (`EGP`). All financial displays, API request bodies, and database defaults must utilize EGP.

---

## 3. Technology Stack

### 3.1 Frontend (Mobile Application)
- **Framework:** React Native / Expo.
- **State Management:** Redux Toolkit / Zustand. (Note: State selectors must be configured to format currency values appending " EGP" and handle localized numbering).
- **Navigation:** React Navigation v6 (Stack + Bottom Tabs).
- **Styling:** React Native Styling / Tailwind for React Native (NativeWind).

### 3.2 Backend & Services
- **Runtime:** Node.js.
- **Framework:** Express.js / NestJS.
- **Database:** PostgreSQL.
- **ORM:** Prisma ORM.

### 3.3 Third-Party Services (Simulated/Mocked)
- **SMS / OTP Providers:** Simulated representation of Egyptian providers (**CEQUENS** or **VictoryLink**).
  - *Dev Note:* In backend logic, logging the OTP code directly to the server terminal (`console.log(OTP)`) or using a static code (`1234`) will replace actual SMS dispatch.
- **Payment Gateways:** Simulated representation of **Paymob**, **Fawry**, **Meeza**, and **Vodafone Cash**.
  - *Dev Note:* The frontend will provide the UI/UX for these gateways, but the backend endpoint `/api/payments/charge` will immediately return a HTTP 200 `success` simulated payload.

---

## 4. Database Schema Adjustments (PostgreSQL + Prisma)

### 4.1 Users & Drivers Tables
* `phone` column must accept strings long enough for `+20` standard (VARCHAR). Backend validation layer (e.g., Zod or Joi) will enforce the Egyptian length.

### 4.2 Wallets Table
* The `currency` column default value has been updated to `EGP`.
```prisma
model Wallet {
  id        String    @id @default(uuid())
  userId    String    @unique @map("user_id")
  balance   Decimal   @default(0) @db.Decimal(10, 2)
  currency  String    @default("EGP") // Updated!
  // ...
}
```

### 4.3 Payment Methods Table
* The `type` column logic supports localized Egyptian methods.
```prisma
model PaymentMethod {
  id        String    @id @default(uuid())
  userId    String    @map("user_id")
  type      String    // Options: meeza | vodafone_cash | visa | mastercard
  // ...
}
```

---

## 5. Frontend UI/UX Adjustments

1. **Number Formatting:** Ensure all user inputs for mobile numbers automatically prefix `+20` and restrict input to exactly 11 numeric characters.
2. **Currency Presentation:** Update localized formatters to output `EGP 150.00` or `١٥٠ ج.م`.
3. **Checkout Screen UI:** Design mockups should reflect standard Egyptian payment options. Ensure logos for Vodafone Cash, Fawry, and Meeza are imported into the project's assets.
4. **Mocked Payment Modals:** Implement a dummy processing modal that spins for 2 seconds and returns a "Success" animation to demonstrate the UX flow without real transactional processing.

---

## 6. Implementation Roadmap (Simplified for Academics)

### Phase 1: Database & Backend Core
1. Initialize Prisma schema with the new `EGP` and `meeza`/`vodafone_cash` parameters natively applied.
2. Build account creation APIs with static `1234` OTP bypass.
3. Build order CRUD (Create, Read, Update, Delete) endpoints.

### Phase 2: Frontend Integration
1. Configure Redux/Zustand slices for User, Cars, and Orders using `EGP` standards.
2. Implement phone number input validations globally (+20 / 11 digits).
3. Integrate real-time or mocked order status tracking interfaces.

### Phase 3: The "Driver" Simulation (Alternative Approach)
*Instead of building a massive secondary Driver Mobile App within the limited timeframe:*
1. Build a basic internal **Web Dashboard (Admin Panel)** or use simple raw API endpoints (e.g., Postman / cURL scripts) to manually flip order statuses (`pending` -> `accepted_by_driver` -> `in_progress` -> `completed_and_paid`).

### Phase 4: Mocked Payment Gateway
1. Connect the React Native checkout screens to the mock backend endpoint.
2. Auto-generate digital PDF invoices showing EGP amounts upon successful mock payment.
