"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEnum = void 0;
var EventEnum;
(function (EventEnum) {
    EventEnum["ORDER_CREATED"] = "order.created";
    EventEnum["ORDER_CONFIRMED"] = "order.confirmed";
    EventEnum["ORGANIZATION_DELETED"] = "organization.deleted";
    EventEnum["ATTRIBUTE_UPDATED"] = "attribute.updated";
    EventEnum["ATTRIBUTE_VALUE_UPDATED"] = "attribute_value.updated";
    EventEnum["TAX_UPDATED"] = "tax.updated";
    EventEnum["PRODUCT_UPDATED"] = "product.updated";
    EventEnum["USER_UPDATED"] = "user.updated";
})(EventEnum || (exports.EventEnum = EventEnum = {}));
