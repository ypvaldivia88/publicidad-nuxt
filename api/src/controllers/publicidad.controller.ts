import { Filter, repository } from "@loopback/repository";
import { param, get, getModelSchemaRef, response } from "@loopback/rest";
import { Publicidad } from "../models";
import { PublicidadRepository } from "../repositories";

export class PublicidadController {
  constructor(
    @repository(PublicidadRepository)
    public publicidadRepository: PublicidadRepository
  ) {}

  @get("/publicidades/random")
  @response(200, {
    description: "Array of Publicidad model instances",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: getModelSchemaRef(Publicidad, { includeRelations: true }),
        },
      },
    },
  })
  async random(
    @param.filter(Publicidad) filter?: Filter<Publicidad>
  ): Promise<Publicidad[]> {
    const publicidadCollection = (this.publicidadRepository.dataSource
      .connector as any).collection("Publicidad");
    return await publicidadCollection.aggregate([{ $limit: 1 }]).get();
  }
}
