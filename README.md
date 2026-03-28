# Withdrawal Helper

A small React app to copy withdrawal account details and export QR codes. Values are generated on load and can be regenerated per field.

**Live demo:** [https://anthonylee1994.github.io/ub-withdrawal-helper/](https://anthonylee1994.github.io/ub-withdrawal-helper/)

## Features

- **Copy fields** — Bank account, USDT, Digital RMB, and ToPay. Each row has a copy action on the input and a **Generate** button for a new random value.
- **QR codes** — WeChat Pay (`wxp://…`) and Alipay (`https://qr.alipay.com/…`). **Generate** creates a new URL and refreshes the QR; **Download** saves the image as PNG.

## Generators (overview)

| Field        | Behavior |
| ------------ | -------- |
| Bank account | Random card number from BIN config + Luhn check digit |
| USDT         | Random TRC-20–style address |
| Digital RMB  | Random 16-digit string |
| ToPay        | Random 16-digit string |
| WeChat       | `wxp://` + 30 random digits |
| Alipay       | `https://qr.alipay.com/` + 24 random lowercase alphanumeric characters |

Generator code lives under `src/utils/generators/`.

## Tech stack

- [React](https://react.dev/) 19, [TypeScript](https://www.typescriptlang.org/), [Vite](https://vite.dev/)
- [HeroUI](https://www.heroui.com/) (React Aria–based UI)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [qrcode](https://www.npmjs.com/package/qrcode) for canvas QR rendering

## Scripts

```bash
pnpm install    # or npm install / yarn
pnpm dev        # local dev server
pnpm build      # typecheck + production bundle
pnpm preview    # serve production build locally
pnpm lint       # ESLint
pnpm format     # Prettier
```

## Disclaimer

Generated numbers and URLs are for convenience and testing only. They are not guaranteed to match real bank, blockchain, or payment-network rules beyond the patterns implemented here.
