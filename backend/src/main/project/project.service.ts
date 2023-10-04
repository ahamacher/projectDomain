import { Injectable } from "@nestjs/common"
import { Project as ProjectModel, Prisma } from "@prisma/client"
import { ProjectRepo } from "./domainModels/project.repo"
import { Project, ProjectProps, UniqueId } from "@modernfinops/shared"

@Injectable()
export class ProjectService {
  constructor(private projectRepo: ProjectRepo) {}

  async create(projectProps: ProjectProps): Promise<Project> {
    const project = Project.create(projectProps)
    await this.projectRepo.save(project)
    return project
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ProjectWhereUniqueInput
    where?: Prisma.ProjectWhereInput
    orderBy?: Prisma.ProjectOrderByWithRelationInput
  }): Promise<Project[]> {
    return await this.projectRepo.findAll(params)
  }

  async findOne(id: string): Promise<Project> {
    return await this.projectRepo.getProjectById(id)
  }

  async update(id: string, projectProps: ProjectProps) {
    const project = Project.create(projectProps, UniqueId.create(id))
    await this.projectRepo.save(project)
    return project
  }

  async remove(id: string): Promise<ProjectModel> {
    return await this.projectRepo.remove(id)
  }
}
