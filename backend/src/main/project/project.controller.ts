import { Controller, Post, Put, Delete, Get, Param, Body } from "@nestjs/common"
import { ProjectService } from "./project.service"
import { Address, Project } from "@modernfinops/shared"

@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(
    @Body() projectData: { name: string; notes: string; address: Address }
  ): Promise<Project> {
    const { name, notes, address } = projectData
    return this.projectService.create({
      name,
      notes,
      address,
    })
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() projectData: { name: string; notes: string; address: Address }
  ): Promise<Project> {
    return this.projectService.update(id, projectData)
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<string> {
    await this.projectService.remove(id)
    return id
  }

  @Get(":id")
  async getOneById(@Param("id") id: string): Promise<Project | null> {
    return this.projectService.findOne(id)
  }

  @Get("all")
  async getAll(): Promise<Project[]> {
    return this.projectService.findAll({})
  }
}
