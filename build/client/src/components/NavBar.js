"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const auth_1 = __importDefault(require("../utils/auth"));
const NavBar = () => {
    const [tab, setTab] = (0, react_1.useState)('Profile');
    const handleTabChange = (tab) => setTab(tab);
    const renderTab = () => {
    };
    if (auth_1.default.loggedIn()) {
        return ((0, jsx_runtime_1.jsx)("header", Object.assign({ className: 'p-3 bg-dark text-white' }, { children: (0, jsx_runtime_1.jsx)("div", { className: 'container-fluid' }) })));
    }
    else {
        return ((0, jsx_runtime_1.jsx)("header", Object.assign({ className: 'p-3 bg-dark text-white' }, { children: (0, jsx_runtime_1.jsx)("div", { className: 'container-fluid' }) })));
    }
};
exports.default = NavBar;
