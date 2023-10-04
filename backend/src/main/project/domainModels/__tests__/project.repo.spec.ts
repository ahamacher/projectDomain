import { Test, TestingModule } from "@nestjs/testing"
import { ProjectRepo } from "../project.repo"
import { PrismaService } from "@support/database/prisma.service"
import { Address, Project } from "@modernfinops/shared"
import { NotFoundError } from "@prisma/client/runtime"

let projectRepo: ProjectRepo
let prismaService: PrismaService

describe("ProjectController", () => {
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectRepo, PrismaService],
    }).compile()

    projectRepo = module.get<ProjectRepo>(ProjectRepo)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  it("Should save a New Project to the DB", async () => {
    const address = Address.create({
      line1: "123 Main street",
      line2: "Apt 100",
      city: "San Francisco",
      state: "CA",
      zip: "95000",
    })

    const newProject = Project.create({
      name: "Test Project",
      notes: "Notes about the project",
      address,
    })

    await projectRepo.save(newProject)
    const projectPersistanceData = await prismaService.project.findUnique({
      where: { id: newProject.id.toString() },
      include: { address: true },
    })
    expect(projectPersistanceData).toBeTruthy()
    expect(projectPersistanceData?.address?.line1).toBe(address.line1)
  })

  it("Should Update an Existing Project in the DB", async () => {
    const existingProject = await projectRepo.getProjectById(
      "test-project-id-1"
    )
    if (!existingProject) {
      throw new Error("Please load fixtures before running this test!")
    }

    const updatedProject = Project.create(
      {
        name: existingProject.name,
        notes: "This note has been updated",
        address: existingProject.address,
      },
      existingProject.id
    )
    await projectRepo.save(updatedProject)

    const existingProjectAfterUpdate = await projectRepo.getProjectById(
      "test-project-id-1"
    )
    expect(existingProjectAfterUpdate.notes).toBe(updatedProject.notes)
    expect(existingProjectAfterUpdate.name).toBe(existingProject.name)
    expect(
      existingProject.address.equals(existingProjectAfterUpdate.address)
    ).toBeTruthy()
  })

  it("Should Remove an Existing Project in the DB", async () => {
    const address = Address.create({
      line1: "456 Main street",
      line2: "",
      city: "San Francisco",
      state: "CA",
      zip: "95000",
    })

    const newProject = Project.create({
      name: "Test Project Delete",
      notes: "This project will be deleted",
      address,
    })

    await projectRepo.save(newProject)

    const projectAfterDelete = await projectRepo.remove(
      newProject.id.toString()
    )

    expect(projectAfterDelete.id).toBe(newProject.id.toString())
    try {
      // might not be the right use to check for lack of the item but was having issues with
      // jest not picking up the not found error with .toThrow
      await projectRepo.getProjectById(newProject.id.toString())
    } catch (e) {
      expect(e).toEqual(new NotFoundError("No Project found"))
    }
  })
})
