import { IProcessor } from "@getbigger-io/prisma-fixtures-cli"
import { Address } from "@prisma/client"

// Due to the parser that the fixture package uses, a Preprocessor is needed to convert
// the zip from an int into a string
export default class AddressProcessor implements IProcessor<Address> {
  preProcess(zip: string, object: any): any {
    return { ...object, zip: object.zip.toString() }
  }
}
