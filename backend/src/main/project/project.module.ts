import { Module } from "@nestjs/common"
import { PrismaService } from "@support/database/prisma.service"
import { ProjectRepo } from "./domainModels/project.repo"
import { ProjectService } from "./project.service"
import { ProjectController } from "./project.controller"

@Module({
  controllers: [ProjectController],
  providers: [ProjectRepo, PrismaService, ProjectService],
})
export class ProjectModule {}
