"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaIntrospectionService = void 0;
require("reflect-metadata");
const storage_1 = require("class-transformer/cjs/storage");
const PRIMITIVE_TYPE_NAMES = {
    String: 'string',
    Number: 'number',
    Boolean: 'boolean',
    Date: 'date',
    Array: 'array',
};
class SchemaIntrospectionService {
    introspect(entityClass, visited = new Set()) {
        if (visited.has(entityClass)) {
            return [];
        }
        const branchVisited = new Set(visited);
        branchVisited.add(entityClass);
        return storage_1.defaultMetadataStorage.getExposedMetadatas(entityClass)
            .filter(metadata => metadata.propertyName !== undefined)
            .map(metadata => this.buildFieldSchemaEntry(entityClass, metadata, branchVisited));
    }
    buildFieldSchemaEntry(entityClass, metadata, visited) {
        var _a, _b, _c, _d;
        const propertyName = (_a = metadata.options.name) !== null && _a !== void 0 ? _a : metadata.propertyName;
        const groups = (_b = metadata.options.groups) !== null && _b !== void 0 ? _b : [];
        const typeMetadata = storage_1.defaultMetadataStorage.findTypeMetadata(entityClass, metadata.propertyName);
        const nestedClass = (_c = typeMetadata === null || typeMetadata === void 0 ? void 0 : typeMetadata.typeFunction) === null || _c === void 0 ? void 0 : _c.call(typeMetadata);
        const reflectedType = Reflect.getMetadata('design:type', entityClass.prototype, metadata.propertyName);
        if (nestedClass && storage_1.defaultMetadataStorage.getExposedMetadatas(nestedClass).length > 0) {
            return {
                name: propertyName,
                type: (reflectedType === null || reflectedType === void 0 ? void 0 : reflectedType.name) === 'Array' ? 'array' : 'object',
                groups,
                nested: this.introspect(nestedClass, visited),
            };
        }
        const type = (_d = PRIMITIVE_TYPE_NAMES[reflectedType === null || reflectedType === void 0 ? void 0 : reflectedType.name]) !== null && _d !== void 0 ? _d : 'unknown';
        return { name: propertyName, type, groups };
    }
    filterByScopes(entries, scopes) {
        return entries
            .filter(entry => entry.groups.some(group => scopes.includes(group)))
            .map(entry => entry.nested
            ? Object.assign(Object.assign({}, entry), { nested: this.filterByScopes(entry.nested, scopes) }) : entry);
    }
}
exports.SchemaIntrospectionService = SchemaIntrospectionService;
