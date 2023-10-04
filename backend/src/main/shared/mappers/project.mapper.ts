import { UniqueId, Project, ProjectProps, Address } from "@modernfinops/shared"
import {
  Project as ProjectPrisma,
  Address as AddressPrisma,
} from "@prisma/client"

// Attaches the Address with the Project for creating a new project from the domain model
export interface ProjectWithAddress extends ProjectPrisma {
  address: AddressPrisma
}

export class ProjectMapper {
  public static toDomain(project: ProjectWithAddress): Project {
    const { address } = project
    const addressProps = {
      line1: address.line1,
      // Needing to redefine the optional line2 as prisma defines missing
      // fields as null while the optional model defines them as undefined
      line2: address.line2 || undefined,
      city: address.city,
      state: address.state,
      zip: address.zip,
    }

    const projectProps: ProjectProps = {
      name: project.name,
      notes: project.notes,
      address: Address.create(addressProps),
    }
    return Project.create(projectProps, UniqueId.create(project.id))
  }
}
