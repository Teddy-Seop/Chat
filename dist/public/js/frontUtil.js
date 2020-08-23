"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
const DataGetter = (url, data) => {
    let result;
    jquery_1.default.ajax({
        url: url,
        type: 'GET',
        data: data,
        dataType: 'json'
    }).done((res) => {
        result = res;
    });
    return result;
};
exports.default = DataGetter;
//# sourceMappingURL=frontUtil.js.map