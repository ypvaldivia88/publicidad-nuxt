import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Cliente, ClienteRelations, Publicidad} from '../models';
import {PublicidadRepository} from './publicidad.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly publicidades: HasManyRepositoryFactory<Publicidad, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PublicidadRepository') protected publicidadRepositoryGetter: Getter<PublicidadRepository>,
  ) {
    super(Cliente, dataSource);
    this.publicidades = this.createHasManyRepositoryFactoryFor('publicidades', publicidadRepositoryGetter,);
    this.registerInclusionResolver('publicidades', this.publicidades.inclusionResolver);
  }
}
