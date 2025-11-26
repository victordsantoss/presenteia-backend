export interface IBaseRepository<Entity, CreateInput = any, UpdateInput = any> {
  findAll(): Promise<Entity[]>;
  findById(id: string): Promise<Entity | null>;
  create(data: CreateInput): Promise<Entity>;
  update(id: string, data: UpdateInput): Promise<Entity>;
  delete(id: string): Promise<void>;
  findOneBy<K extends keyof Entity>(
    field: K,
    value: Entity[K],
  ): Promise<Entity | null>;

  findManyBy<K extends keyof Entity>(
    field: K,
    value: Entity[K],
  ): Promise<Entity[]>;

  findOneByAndIncludes<K extends keyof Entity>(
    field: K,
    value: Entity[K],
    relations: string[],
  ): Promise<Entity | null>;

  findManyByAndIncludes<K extends keyof Entity>(
    field: K,
    value: Entity[K],
    relations: string[],
  ): Promise<Entity[]>;
}
