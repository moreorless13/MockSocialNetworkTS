"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const FollowersTab_1 = __importDefault(require("./ProfileTabs/FollowersTab"));
const FollowingTab_1 = __importDefault(require("./ProfileTabs/FollowingTab"));
const ProfilePageContainer = () => {
    const [key, setKey] = (0, react_1.useState)('Posts');
    return ((0, jsx_runtime_1.jsxs)(react_bootstrap_1.Tabs, Object.assign({ id: 'controlled-tabs', activeKey: key, onSelect: (key) => setKey(key), className: 'mb-3' }, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Tab, { eventKey: 'Posts', title: 'Posts' }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Tab, Object.assign({ eventKey: 'Following', title: 'Following' }, { children: (0, jsx_runtime_1.jsx)(FollowingTab_1.default, {}) })), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Tab, Object.assign({ eventKey: 'Followers', title: 'Followers' }, { children: (0, jsx_runtime_1.jsx)(FollowersTab_1.default, {}) }))] })));
};
exports.default = ProfilePageContainer;
