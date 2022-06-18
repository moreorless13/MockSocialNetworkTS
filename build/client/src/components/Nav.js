"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const auth_1 = __importDefault(require("../utils/auth"));
const NavigationBar = () => {
    const username = localStorage.getItem('username');
    const [key, setKey] = (0, react_1.useState)('/');
    if (auth_1.default.loggedIn()) {
        return ((0, jsx_runtime_1.jsx)("header", { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Navbar, Object.assign({ expand: 'lg', className: 'p-3 bg-dark text-white', fixed: 'top' }, { children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Container, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Navbar.Brand, Object.assign({ className: 'text-white', href: '/' }, { children: "Home" })), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Navbar.Toggle, { "aria-controls": 'basic-navbar-nav' }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Navbar.Collapse, Object.assign({ id: 'basic-navbar-nav', className: 'justify-content-end' }, { children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Nav, Object.assign({ activeKey: key, onSelect: (key) => setKey(key), className: 'justify-content-end' }, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Nav.Item, { children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Nav.Link, Object.assign({ eventKey: '/userPage', href: '/userPage', className: 'text-white' }, { children: [username, "'s Page"] })) }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Nav.Item, { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Nav.Link, Object.assign({ href: '/', onClick: () => auth_1.default.logout(), className: 'text-white' }, { children: "Log Out" })) })] })) }))] }) })) }));
    }
    else {
        return ((0, jsx_runtime_1.jsx)("header", { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Navbar, Object.assign({ expand: 'lg', className: 'p-3 bg-dark text-white', fixed: 'top' }, { children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Container, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Navbar.Brand, Object.assign({ className: 'text-white justify-content-start', href: '/' }, { children: "Home" })), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Navbar.Toggle, { "aria-controls": 'basic-navbar-nav', className: 'justify-content-end' }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Navbar.Collapse, Object.assign({ id: 'basic-navbar-nav', className: 'justify-content-end' }, { children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Nav, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Nav.Item, { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Nav.Link, Object.assign({ href: '/signup', className: 'text-white' }, { children: "Sign Up" })) }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Nav.Item, { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Nav.Link, Object.assign({ href: '/login', className: 'text-white' }, { children: "Login" })) })] }) }))] }) })) }));
    }
};
exports.default = NavigationBar;
