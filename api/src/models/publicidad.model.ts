import {Entity, model, property} from '@loopback/repository';

@model()
export class Publicidad extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  textoCorto?: string;

  @property({
    type: 'string',
  })
  textoLargo?: string;

  @property({
    type: 'string',
  })
  alcance?: string;

  @property({
    type: 'string',
  })
  categoriaId?: string;

  @property({
    type: 'string',
  })
  clienteId?: string;

  constructor(data?: Partial<Publicidad>) {
    super(data);
  }
}

export interface PublicidadRelations {
  // describe navigational properties here
}

export type PublicidadWithRelations = Publicidad & PublicidadRelations;
