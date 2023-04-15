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
/home/cplummer/work/MikroOrmBug/node_modules/.pnpm/@mikro-orm+core@5.6.16_@mikro-orm+migrations@5.6.16_@mikro-orm+postgresql@5.6.16_@mikro-orm+seeder@5.6.16/node_modules/@mikro-orm/core/entity/wrap.js:21
    return entity.__helper;
                  ^
TypeError: Cannot read properties of undefined (reading '__helper')
    at helper (/home/cplummer/work/MikroOrmBug/node_modules/.pnpm/@mikro-orm+core@5.6.16_@mikro-orm+migrations@5.6.16_@mikro-orm+postgresql@5.6.16_@mikro-orm+seeder@5.6.16/node_modules/@mikro-orm/core/entity/wrap.js:21:19)
    at /home/cplummer/work/MikroOrmBug/node_modules/.pnpm/@mikro-orm+core@5.6.16_@mikro-orm+migrations@5.6.16_@mikro-orm+postgresql@5.6.16_@mikro-orm+seeder@5.6.16/node_modules/@mikro-orm/core/entity/EntityLoader.js:185:47
    at Array.forEach (<anonymous>)
    at EntityLoader.initializeOneToMany (/home/cplummer/work/MikroOrmBug/node_modules/.pnpm/@mikro-orm+core@5.6.16_@mikro-orm+migrations@5.6.16_@mikro-orm+postgresql@5.6.16_@mikro-orm+seeder@5.6.16/node_modules/@mikro-orm/core/entity/EntityLoader.js:183:22)
    at EntityLoader.initializeCollections (/home/cplummer/work/MikroOrmBug/node_modules/.pnpm/@mikro-orm+core@5.6.16_@mikro-orm+migrations@5.6.16_@mikro-orm+postgresql@5.6.16_@mikro-orm+seeder@5.6.16/node_modules/@mikro-orm/core/entity/EntityLoader.js:162:18)
    at EntityLoader.populateMany (/home/cplummer/work/MikroOrmBug/node_modules/.pnpm/@mikro-orm+core@5.6.16_@mikro-orm+migrations@5.6.16_@mikro-orm+postgresql@5.6.16_@mikro-orm+seeder@5.6.16/node_modules/@mikro-orm/core/entity/EntityLoader.js:157:14)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async EntityLoader.populateField (/home/cplummer/work/MikroOrmBug/node_modules/.pnpm/@mikro-orm+core@5.6.16_@mikro-orm+migrations@5.6.16_@mikro-orm+postgresql@5.6.16_@mikro-orm+seeder@5.6.16/node_modules/@mikro-orm/core/entity/EntityLoader.js:241:27)
    at async EntityLoader.populate (/home/cplummer/work/MikroOrmBug/node_modules/.pnpm/@mikro-orm+core@5.6.16_@mikro-orm+migrations@5.6.16_@mikro-orm+postgresql@5.6.16_@mikro-orm+seeder@5.6.16/node_modules/@mikro-orm/core/entity/EntityLoader.js:43:13)
    at async SqlEntityManager.lockAndPopulate (/home/cplummer/work/MikroOrmBug/node_modules/.pnpm/@mikro-orm+core@5.6.16_@mikro-orm+migrations@5.6.16_@mikro-orm+postgresql@5.6.16_@mikro-orm+seeder@5.6.16/node_modules/@mikro-orm/core/EntityManager.js:1147:9)
 ELIFECYCLE  Test failed. See above for more details.
```

### Working version
To show that it works on 5.6.15:

* Replace `^5.6.16` in `package.json` with `5.6.15` (no caret `^`)
* `rm -rf node_modules/ pnpm-lock.yaml`
* `pnpm install`
* `pnpm test`

This should print out the line: `Found the order: 1234`
