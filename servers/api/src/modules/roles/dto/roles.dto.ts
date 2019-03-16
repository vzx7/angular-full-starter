export class RolesDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  // TODO Нужен тип
  users?: any[];
}
