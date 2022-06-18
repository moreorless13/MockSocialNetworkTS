"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const auth_1 = __importDefault(require("../utils/auth"));
const SignUpForm_1 = __importDefault(require("../components/forms/SignUpForm"));
const Jumbotron_1 = __importDefault(require("../components/Jumbotron"));
const UsersNotFollowed_1 = __importDefault(require("../components/UsersNotFollowed"));
const HomePage = () => {
    const [myUsername, setMyUsername] = (0, react_1.useState)(localStorage.getItem('username'));
    if (auth_1.default.loggedIn()) {
        return ((0, jsx_runtime_1.jsxs)(Jumbotron_1.default, { children: [(0, jsx_runtime_1.jsxs)("h1", { children: ["Welcome back, ", myUsername, "!"] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(UsersNotFollowed_1.default, {})] }));
    }
    else {
        return ((0, jsx_runtime_1.jsx)(Jumbotron_1.default, { children: (0, jsx_runtime_1.jsx)(SignUpForm_1.default, {}) }));
    }
};
exports.default = HomePage;
