import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from "@loopback/repository";
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from "@loopback/rest";
import { Categoria, Publicidad } from "../models";
import { CategoriaRepository } from "../repositories";

export class CategoriaPublicidadController {
  constructor(
    @repository(CategoriaRepository)
    protected categoriaRepository: CategoriaRepository
  ) {}

  @get("/categorias/{id}/publicidades", {
    responses: {
      "200": {
        description: "Array of Categoria has many Publicidad",
        content: {
          "application/json": {
            schema: { type: "array", items: getModelSchemaRef(Publicidad) },
          },
        },
      },
    },
  })
  async find(
    @param.path.string("id") id: string,
    @param.query.object("filter") filter?: Filter<Publicidad>
  ): Promise<Publicidad[]> {
    return this.categoriaRepository.publicidades(id).find(filter);
  }

  @get("/categorias/{id}/random/publicity", {
    responses: {
      "200": {
        description: "Random Publicidad from a Category",
        content: {
          "application/json": { schema: getModelSchemaRef(Publicidad) },
        },
      },
    },
  })
  async randomPublicity(
    @param.path.string("id") id: string
  ): Promise<Publicidad[]> {
    const anuncios = await this.categoriaRepository
      .publicidades(id)
      .find({ skip: 0, limit: 1000 });

    const skip = Math.floor(Math.random() * anuncios.length);

    return await this.categoriaRepository
      .publicidades(id)
      .find({ skip: skip, limit: 1 });
  }

  @post("/categorias/{id}/publicidades", {
    responses: {
      "200": {
        description: "Categoria model instance",
        content: {
          "application/json": { schema: getModelSchemaRef(Publicidad) },
        },
      },
    },
  })
  async create(
    @param.path.string("id") id: typeof Categoria.prototype.id,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Publicidad, {
            title: "NewPublicidadInCategoria",
            exclude: ["id"],
            optional: ["categoriaId"],
          }),
        },
      },
    })
    publicidad: Omit<Publicidad, "id">
  ): Promise<Publicidad> {
    return this.categoriaRepository.publicidades(id).create(publicidad);
  }

  @patch("/categorias/{id}/publicidades", {
    responses: {
      "200": {
        description: "Categoria.Publicidad PATCH success count",
        content: { "application/json": { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.string("id") id: string,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Publicidad, { partial: true }),
        },
      },
    })
    publicidad: Partial<Publicidad>,
    @param.query.object("where", getWhereSchemaFor(Publicidad))
    where?: Where<Publicidad>
  ): Promise<Count> {
    return this.categoriaRepository.publicidades(id).patch(publicidad, where);
  }

  @del("/categorias/{id}/publicidades", {
    responses: {
      "200": {
        description: "Categoria.Publicidad DELETE success count",
        content: { "application/json": { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.string("id") id: string,
    @param.query.object("where", getWhereSchemaFor(Publicidad))
    where?: Where<Publicidad>
  ): Promise<Count> {
    return this.categoriaRepository.publicidades(id).delete(where);
  }
}
