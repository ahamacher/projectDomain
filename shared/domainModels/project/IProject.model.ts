import { Model, UniqueId } from "../"
import { Address } from "../valueObjects/Address"

export interface ProjectProps {
  address: Address
  name: string
  notes: string
}

export interface IProject extends Model<ProjectProps> {
  id: UniqueId
  address: Address
  name: string
  notes: string
}
