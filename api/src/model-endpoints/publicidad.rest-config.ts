import { ModelCrudRestApiConfig } from '@loopback/rest-crud';
import { Publicidad } from '../models';

const config: ModelCrudRestApiConfig = {
  model: Publicidad,
  pattern: 'CrudRest',
  dataSource: 'mongo',
  basePath: '/publicidades',
};
module.exports = config;
