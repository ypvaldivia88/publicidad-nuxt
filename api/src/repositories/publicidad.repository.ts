import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Publicidad, PublicidadRelations} from '../models';

export class PublicidadRepository extends DefaultCrudRepository<
  Publicidad,
  typeof Publicidad.prototype.id,
  PublicidadRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Publicidad, dataSource);
  }
}
