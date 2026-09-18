import 'reflect-metadata'
import { defaultMetadataStorage } from 'class-transformer/cjs/storage'

export interface FieldSchemaEntry {
    name: string
    type: string
    groups: string[]
    nested?: FieldSchemaEntry[]
}

const PRIMITIVE_TYPE_NAMES: Record<string, string> = {
    String: 'string',
    Number: 'number',
    Boolean: 'boolean',
    Date: 'date',
    Array: 'array',
}

export class SchemaIntrospectionService
{
    introspect(entityClass: Function, visited: Set<Function> = new Set()): FieldSchemaEntry[]
    {
        if (visited.has(entityClass)) {
            return []
        }

        const branchVisited = new Set(visited)
        branchVisited.add(entityClass)

        return defaultMetadataStorage.getExposedMetadatas(entityClass)
            .filter(metadata => metadata.propertyName !== undefined)
            .map(metadata => this.buildFieldSchemaEntry(entityClass, metadata, branchVisited))
    }

    private buildFieldSchemaEntry(entityClass: Function, metadata: any, visited: Set<Function>): FieldSchemaEntry
    {
        const propertyName: string = metadata.options.name ?? metadata.propertyName
        const groups: string[] = metadata.options.groups ?? []

        const typeMetadata = defaultMetadataStorage.findTypeMetadata(entityClass, metadata.propertyName)
        const nestedClass: Function | undefined = typeMetadata?.typeFunction?.()
        const reflectedType = Reflect.getMetadata('design:type', entityClass.prototype, metadata.propertyName)

        if (nestedClass && defaultMetadataStorage.getExposedMetadatas(nestedClass).length > 0) {
            return {
                name: propertyName,
                type: reflectedType?.name === 'Array' ? 'array' : 'object',
                groups,
                nested: this.introspect(nestedClass, visited),
            }
        }

        const type = PRIMITIVE_TYPE_NAMES[reflectedType?.name] ?? 'unknown'

        return { name: propertyName, type, groups }
    }

    filterByScopes(entries: FieldSchemaEntry[], scopes: string[]): FieldSchemaEntry[]
    {
        return entries
            .filter(entry => entry.groups.some(group => scopes.includes(group)))
            .map(entry => entry.nested
                ? { ...entry, nested: this.filterByScopes(entry.nested, scopes) }
                : entry
            )
    }
}
