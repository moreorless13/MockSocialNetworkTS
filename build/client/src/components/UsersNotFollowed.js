"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("@apollo/client");
const queries_1 = require("../utils/queries");
const FollowUnFollow_1 = __importDefault(require("../components/buttons/FollowUnFollow"));
const react_bootstrap_1 = require("react-bootstrap");
const UsersNotFollowed = () => {
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
    return ((0, jsx_runtime_1.jsx)(react_bootstrap_1.Row, { children: usersMap }));
};
exports.default = UsersNotFollowed;
