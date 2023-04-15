import { Options } from '@mikro-orm/core/utils/Configuration';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { LoadStrategy, PopulateHint } from '@mikro-orm/core';

import { LineItem, Order, Shipment } from '../entities';

export function buildMikroOrmConfig(): Options<PostgreSqlDriver> {
  return {
    type: 'postgresql',
    dbName: 'test',
    host: 'localhost',
    port: 55322,
    user: 'test',
    password: 'weaklocalpassword',
    loadStrategy: LoadStrategy.JOINED,
    populateWhere: PopulateHint.ALL,
    entities: [Order, Shipment, LineItem],
    migrations: {
      pathTs: 'src/migrations',
      emit: 'ts',
    },
  };
}

export default buildMikroOrmConfig;
