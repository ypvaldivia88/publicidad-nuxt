import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import { Cliente, Publicidad } from '../models';
import { ClienteRepository } from '../repositories';

export class ClientePublicidadController {
  constructor(
    @repository(ClienteRepository)
    protected clienteRepository: ClienteRepository
  ) {}

  @get('/clientes/{id}/publicidades', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Publicidad',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Publicidad) },
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Publicidad>
  ): Promise<Publicidad[]> {
    return this.clienteRepository.publicidades(id).find(filter);
  }

  @post('/clientes/{id}/publicidades', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(Publicidad) },
        },
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicidad, {
            title: 'NewPublicidadInCliente',
            exclude: ['id'],
            optional: ['clienteId'],
          }),
        },
      },
    })
    publicidad: Omit<Publicidad, 'id'>
  ): Promise<Publicidad> {
    return this.clienteRepository.publicidades(id).create(publicidad);
  }

  @patch('/clientes/{id}/publicidades', {
    responses: {
      '200': {
        description: 'Cliente.Publicidad PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicidad, { partial: true }),
        },
      },
    })
    publicidad: Partial<Publicidad>,
    @param.query.object('where', getWhereSchemaFor(Publicidad))
    where?: Where<Publicidad>
  ): Promise<Count> {
    return this.clienteRepository.publicidades(id).patch(publicidad, where);
  }

  @del('/clientes/{id}/publicidades', {
    responses: {
      '200': {
        description: 'Cliente.Publicidad DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Publicidad))
    where?: Where<Publicidad>
  ): Promise<Count> {
    return this.clienteRepository.publicidades(id).delete(where);
  }
}
