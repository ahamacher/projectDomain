import { IProject } from "@modernfinops/shared"

export abstract class IProjectRepo {
  abstract getProjectById(projectId: string): Promise<IProject>
}
