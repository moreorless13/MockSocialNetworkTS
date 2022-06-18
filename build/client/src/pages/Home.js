"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const auth_1 = __importDefault(require("../utils/auth"));
const client_1 = require("@apollo/client");
const queries_1 = require("../utils/queries");
const SignUpForm_1 = __importDefault(require("../components/forms/SignUpForm"));
const Jumbotron_1 = __importDefault(require("../components/Jumbotron"));
const react_bootstrap_1 = require("react-bootstrap");
const FollowUnFollow_1 = __importDefault(require("../components/buttons/FollowUnFollow"));
const HomePage = () => {
    const [myUsername, setMyUsername] = (0, react_1.useState)(localStorage.getItem('username'));
    const { data } = (0, client_1.useQuery)(queries_1.QUERY_FILTER_USERS);
    console.log(data);
    const usersMap = data === null || data === void 0 ? void 0 : data.filterUsers.map((user) => {
        const handleClick = (event) => {
            event.preventDefault();
            window.location.assign(`/profile/${user._id}`);
        };
        console.log(user);
        return ((0, jsx_runtime_1.jsx)(react_bootstrap_1.Col, { children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card, { children: [(0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card.Body, Object.assign({ id: user === null || user === void 0 ? void 0 : user._id }, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Title, { children: user.username }, user === null || user === void 0 ? void 0 : user.username), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Subtitle, { children: user.email }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Text, { children: user.accountStatus }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Button, Object.assign({ onClick: handleClick }, { children: [user === null || user === void 0 ? void 0 : user.username, "'s Profile"] }))] }), user === null || user === void 0 ? void 0 : user._id), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Footer, { children: (0, jsx_runtime_1.jsx)(FollowUnFollow_1.default, { _id: user._id }) })] }) }));
    });
    if (auth_1.default.loggedIn()) {
        return ((0, jsx_runtime_1.jsxs)(Jumbotron_1.default, { children: [(0, jsx_runtime_1.jsxs)("h1", { children: ["Welcome back, ", myUsername, "!"] }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Row, Object.assign({ xs: 1, md: 2 }, { children: usersMap })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", { className: 'row' })] }));
    }
    else {
        return ((0, jsx_runtime_1.jsx)(Jumbotron_1.default, { children: (0, jsx_runtime_1.jsx)(SignUpForm_1.default, {}) }));
    }
};
exports.default = HomePage;
