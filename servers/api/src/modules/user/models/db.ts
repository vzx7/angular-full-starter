import { AdapterSync } from 'lowdb';
import { join } from 'path';
// tslint:disable-next-line: no-var-requires
const low = require('lowdb');
// tslint:disable-next-line: no-var-requires
const FileSync = require('lowdb/adapters/FileSync');

const adapter: AdapterSync = new FileSync(join(__dirname, './lowdb.json'));
const lowdb = low(adapter);

const collections = {
  uploads: 'uploads'
};

lowdb.defaults({ [collections.uploads]: [] }).write();

export { lowdb, collections };
