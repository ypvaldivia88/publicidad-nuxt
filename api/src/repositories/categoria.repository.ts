import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Categoria, CategoriaRelations, Publicidad} from '../models';
import {PublicidadRepository} from './publicidad.repository';

export class CategoriaRepository extends DefaultCrudRepository<
  Categoria,
  typeof Categoria.prototype.id,
  CategoriaRelations
> {

  public readonly publicidades: HasManyRepositoryFactory<Publicidad, typeof Categoria.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PublicidadRepository') protected publicidadRepositoryGetter: Getter<PublicidadRepository>,
  ) {
    super(Categoria, dataSource);
    this.publicidades = this.createHasManyRepositoryFactoryFor('publicidades', publicidadRepositoryGetter,);
    this.registerInclusionResolver('publicidades', this.publicidades.inclusionResolver);
  }
}
