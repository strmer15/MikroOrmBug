# Setup

Issue: https://github.com/mikro-orm/mikro-orm/issues/4216

This reproduction was run on Node 18.15.0 with PNPM 8.2.0

To install Node 18.15.0, you can use `nvm` (https://github.com/nvm-sh/nvm), `nvm install 18.15.0` + `nvm use 18.15.0`.
To install `pnpm`, run `npm install --global pnpm`.

The `test` script in `package.json` creates a Docker container running Postgres 13.2, migrates some table definitions into it, then invokes the `run.ts` file. Once it completes, it tears the Docker container down.

### Broken version
To reproduce:

* `pnpm install`
* `pnpm test`

This should throw an error when the code is finished running:

```
Error: No shipment line items found
```

### Working version
To "fix" it:

* Change `populate: ['lineItems', 'shipments', 'shipments.lineItems'],` to `populate: ['lineItems', 'shipments'],`
* `pnpm test`

This should print out an object called `shipmentLineItems` from the `shipment`:

```js
{
  shipmentLineItems: Collection<LineItem> {
    '0': LineItem {
      id: 'a8b9f46e-59a1-4d5e-a19a-42ca9dd64577',
      sku: 'TEST_SKU_2',
      name: 'Test Product 2',
      createdAt: 2023-05-10T20:38:50.036Z,
      updatedAt: 2023-05-10T20:38:50.036Z,
      order: [Order],
      shipment: [Shipment]
    },
    initialized: true,
    dirty: true
  }
}
```
