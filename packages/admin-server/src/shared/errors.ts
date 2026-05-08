export class DomainError extends Error {
  constructor(
    public readonly code: string,
    message: string
  ) {
    super(message);
    this.name = 'DomainError';
  }
}

export const createNotFoundError = (entity: string, id: string) =>
  new DomainError('NOT_FOUND', `${entity} ${id} was not found.`);
