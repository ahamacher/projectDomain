import { IProjectRepo, ProjectMapper } from "../../shared"
import { Project } from "@modernfinops/shared"
import { Injectable } from "@nestjs/common"
import { PrismaService } from "@support/database/prisma.service"
import { Project as ProjectModel, Prisma } from "@prisma/client"

@Injectable()
export class ProjectRepo implements IProjectRepo {
  constructor(private prisma: PrismaService) {}

  async save(project: Project): Promise<void> {
    const address = project.address
    await this.prisma.project.upsert({
      where: { id: project.id.toString() },
      update: {
        name: project.name,
        notes: project.notes,
        address: {
          update: {
            line1: address.line1,
            line2: address.line2,
            city: address.city,
            state: address.state,
            zip: address.zip,
          },
        },
      },
      create: {
        id: project.id.toString(),
        name: project.name,
        notes: project.notes,
        address: {
          create: {
            line1: address.line1,
            line2: address.line2,
            city: address.city,
            state: address.state,
            zip: address.zip,
          },
        },
      },
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ProjectWhereUniqueInput
    where?: Prisma.ProjectWhereInput
    orderBy?: Prisma.ProjectOrderByWithRelationInput
  }): Promise<Project[]> {
    const { skip, take, cursor, where, orderBy } = params
    const projectsRecord = await this.prisma.project.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        address: true,
      },
    })
    const projects = projectsRecord.map((projectRecord) => {
      return ProjectMapper.toDomain(projectRecord)
    })
    return projects
  }

  async getProjectById(id: string): Promise<Project> {
    const projectRecord = await this.prisma.project.findUniqueOrThrow({
      where: { id },
      include: { address: true },
    })
    return ProjectMapper.toDomain(projectRecord)
  }

  async remove(id: string): Promise<ProjectModel> {
    return this.prisma.project.delete({
      where: { id },
      include: {
        address: true,
      },
    })
  }
}
