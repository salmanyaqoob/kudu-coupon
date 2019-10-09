export class AdminsListConfig {
  type = 'all';

  filters: {
    _id?: string,
    name?: string,
    email?: string,
    limit?: number,
    offset?: number
  } = {};
}
