## mint core collection

1. Clone and install Dependencies

```bash
npm install
```

2. Rename [sample.env](./sample.env) to `.env` and update the `SECRET_KEY` that has devnet SOL, (expects an array) in it and `HELIUS_API_KEY`.

```bash
SECRET_KEY=

HELIUS_API_KEY=
```

3. Call the Script. Assumes that you have `ts-node` installed.

```bash
npm run mint
```
