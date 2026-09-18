import 'reflect-metadata';
export interface FieldSchemaEntry {
    name: string;
    type: string;
    groups: string[];
    nested?: FieldSchemaEntry[];
}
export declare class SchemaIntrospectionService {
    introspect(entityClass: Function, visited?: Set<Function>): FieldSchemaEntry[];
    private buildFieldSchemaEntry;
    filterByScopes(entries: FieldSchemaEntry[], scopes: string[]): FieldSchemaEntry[];
}
