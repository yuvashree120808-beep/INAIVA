# INAIVA — Together, We Rise

A mobile-friendly React + TypeScript prototype for Women's Self-Help Groups (SHGs) in India. It demonstrates simple financial tracking, pricing support, product discovery, and a member directory.

## Demo

Published prototype: https://shg-samaj-uday.lovable.app/

> This repository is a repo-ready starter implementation inspired by the INAIVA project brief. It is not automatically synced to the Lovable project. Replace the demo UI with the exact exported Lovable source if you need a byte-for-byte copy.

## Features

- Dashboard with income, expenses, net profit, and recent transactions
- Add income and expense records (in-memory demo state)
- Search and browse transactions
- Product price calculator using cost and desired margin
- Sample community marketplace
- Sample SHG member directory
- Responsive mobile navigation
- English/Tamil language toggle placeholder
- Sample data clearly identified as demo content
- Unit tests for key financial calculations

## Requirements

- Node.js 20 or later
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Verify and build

```bash
npm test
npm run build
npm run preview
```

## Data and security notes

- Current demo transactions are stored in React state and reset on refresh.
- No authentication, server database, payment processing, order workflow, or real messaging is configured.
- Marketplace and member data are illustrative. Do not publish personal data without consent.
- Before production, add secure authentication, server-side validation, a database, backups, authorization per SHG, privacy notice, and accessibility/localization testing.
- Do not enter real bank credentials or sensitive financial information into this prototype.

## Suggested architecture

```text
Browser
  └── React + TypeScript (Vite)
       ├── Dashboard / transaction state
       ├── Pricing calculator
       ├── Marketplace demo
       └── SHG member directory demo
  Future production services
       ├── Authentication + role-based access
       ├── SHG-scoped API
       ├── Database + audit history
       └── Optional buyer/contact integrations
```

## Sample test cases

| Case | Input | Expected |
|---|---|---|
| Price with margin | Cost ₹100, margin 25% | ₹125 |
| Net profit | Income ₹5,000, expenses ₹1,800 | ₹3,200 |
| Zero-cost product | Cost ₹0, margin 30% | ₹0 |
| Negative cost | Cost -₹1, margin 10% | Validation error |

## License

MIT. See [LICENSE](LICENSE).
