import { Model, UniqueId } from "../"
import { Address } from "../valueObjects/"
import { ProjectProps } from "./"

export class Project extends Model<ProjectProps> {
  get address(): Address {
    return this.props.address
  }

  get name(): string {
    return this.props.name
  }

  get notes(): string {
    return this.props.notes
  }

  private constructor(props: ProjectProps, id?: UniqueId) {
    super(props, id)
  }

  public static create(props: ProjectProps, id?: UniqueId) {
    return new Project(props, id)
  }
}
