"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const client_1 = require("@apollo/client");
const queries_1 = require("../utils/queries");
const auth_1 = __importDefault(require("../utils/auth"));
const Jumbotron_1 = __importDefault(require("../components/Jumbotron"));
const VerifyUser = () => {
    const { userId } = (0, react_router_dom_1.useParams)();
    const { data } = (0, client_1.useQuery)(queries_1.VERIFY_USER, {
        variables: { userId: userId }
    });
    auth_1.default.logout();
    window.location.assign('/login');
    return ((0, jsx_runtime_1.jsx)(Jumbotron_1.default, { children: (0, jsx_runtime_1.jsx)("h1", { children: "Email Successfully Verified!" }) }));
};
exports.default = VerifyUser;
