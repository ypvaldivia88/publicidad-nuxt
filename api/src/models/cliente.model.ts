import { Entity, model, property, hasMany} from '@loopback/repository';
import {Publicidad} from './publicidad.model';

@model()
export class Cliente extends Entity {
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
  telefono?: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
  })
  contrato?: string;

  @property({
    type: 'string',
  })
  direccion?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  persona?: boolean;

  @hasMany(() => Publicidad)
  publicidades: Publicidad[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
