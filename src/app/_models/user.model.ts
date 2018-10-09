export class User {
  email: string;
  firstName: string;
  surName: string;
  password: string;
  token: string;

  getFullName(): string {
    return `${this.firstName} ${this.surName}`;
  }
}
