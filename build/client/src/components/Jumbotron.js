"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function Jumbotron({ children }) {
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ style: {
            height: 560,
            clear: 'both',
            paddingTop: 120,
            textAlign: 'center',
        } }, { children: children })));
}
exports.default = Jumbotron;
