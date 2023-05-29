export class OrgAlreadyExists extends Error {
  constructor() {
    super('Org already exists.')
  }
}
