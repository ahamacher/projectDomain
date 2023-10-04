import { Data } from "dataclass"
import { ValueObject } from "./ValueObject"

class AddressProps {
  line1: string
  line2?: string
  city: string
  state: string
  zip: string
}

export class Address extends ValueObject<AddressProps> {
  static create({ line1, line2, city, state, zip }: AddressProps): Address {
    if (!line1 || !city || !state || !zip) {
      throw new Error("All Fields are required for an address")
    }

    return new Address({ line1, line2, city, state, zip })
  }

  get line1(): string {
    return this.props.line1
  }

  get line2(): string {
    if (!this.props.line2) return ""
    return this.props.line2
  }

  get city(): string {
    return this.props.city
  }

  get state(): string {
    return this.props.state
  }

  get zip(): string {
    return this.props.zip
  }
}
