"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("@apollo/client");
const queries_1 = require("../../utils/queries");
const react_router_dom_1 = require("react-router-dom");
const FollowUnFollow_1 = __importDefault(require("../../components/buttons/FollowUnFollow"));
const react_bootstrap_1 = require("react-bootstrap");
const FollowersTab = () => {
    var _a;
    const { userId } = (0, react_router_dom_1.useParams)();
    const { data } = (0, client_1.useQuery)(queries_1.QUERY_USER, {
        variables: { userId: userId }
    });
    // console.log(data)
    const user = data === null || data === void 0 ? void 0 : data.user;
    const userFollowers = (_a = user === null || user === void 0 ? void 0 : user.followers) === null || _a === void 0 ? void 0 : _a.map((follower) => {
        console.log(follower);
        return ((0, jsx_runtime_1.jsx)(react_bootstrap_1.Col, { children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card, Object.assign({ className: 'justify-content-center' }, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Header, { children: follower === null || follower === void 0 ? void 0 : follower.username }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Body, { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Subtitle, { children: (0, jsx_runtime_1.jsx)("p", { children: follower.email }) }) }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Footer, { children: (0, jsx_runtime_1.jsx)(FollowUnFollow_1.default, { _id: follower === null || follower === void 0 ? void 0 : follower._id }) })] })) }));
    });
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'row justify-content-center' }, { children: [user === null || user === void 0 ? void 0 : user.username, "'s Followers: "] })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'row justify-content-center' }, { children: userFollowers }))] }));
};
exports.default = FollowersTab;
