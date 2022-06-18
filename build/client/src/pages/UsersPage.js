"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const client_1 = require("@apollo/client");
const queries_1 = require("../utils/queries");
const Jumbotron_1 = __importDefault(require("../components/Jumbotron"));
const react_bootstrap_1 = require("react-bootstrap");
const UnfollowUserButton_1 = __importDefault(require("../components/buttons/UnfollowUserButton"));
const DeleteAccountForm_1 = __importDefault(require("../components/forms/DeleteAccountForm"));
const RemoveFollowerButton_1 = __importDefault(require("../components/buttons/RemoveFollowerButton"));
const UsersPage = () => {
    let { data } = (0, client_1.useQuery)(queries_1.QUERY_ME);
    const [show, setShow] = (0, react_1.useState)(false);
    const handleShowRemoveAccount = () => setShow(true);
    const handleCloseRemoveAccount = () => setShow(false);
    console.log(data);
    const me = data === null || data === void 0 ? void 0 : data.me;
    console.log('this is me', me);
    const myFollowers = me === null || me === void 0 ? void 0 : me.followers.map((follower) => {
        console.log(follower);
        const handleClick = (event) => {
            event.preventDefault();
            window.location.assign(`/profile/${follower._id}`);
        };
        return ((0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card, Object.assign({ className: 'col-2' }, { children: [(0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card.Body, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Title, { children: follower.username }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Subtitle, { children: follower.email }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Button, Object.assign({ onClick: handleClick }, { children: [follower === null || follower === void 0 ? void 0 : follower.username, "'s Profile"] }))] }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Footer, { children: (0, jsx_runtime_1.jsx)(RemoveFollowerButton_1.default, { _id: follower === null || follower === void 0 ? void 0 : follower._id }) })] })));
    });
    const whoIFollow = me === null || me === void 0 ? void 0 : me.following.map((following) => {
        console.log(following);
        const handleClick = (event) => {
            event.preventDefault();
            window.location.assign(`/profile/${following._id}`);
        };
        return ((0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card, Object.assign({ className: 'col-2' }, { children: [(0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card.Body, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Title, { children: following.username }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Subtitle, { children: following.email }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Button, Object.assign({ onClick: handleClick }, { children: [following === null || following === void 0 ? void 0 : following.username, "'s Profile"] }))] }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Footer, { children: (0, jsx_runtime_1.jsx)(UnfollowUserButton_1.default, { _id: following === null || following === void 0 ? void 0 : following._id }) })] })));
    });
    return ((0, jsx_runtime_1.jsxs)(Jumbotron_1.default, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'row justify-content-end' }, { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ onClick: () => handleShowRemoveAccount(), variant: 'danger' }, { children: "Delete Account" })), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Modal, Object.assign({ show: show, onHide: handleCloseRemoveAccount }, { children: (0, jsx_runtime_1.jsx)(DeleteAccountForm_1.default, {}) }))] }) })), (0, jsx_runtime_1.jsx)("h6", { children: "My Followers: " }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'row justify-content-center' }, { children: myFollowers })), (0, jsx_runtime_1.jsx)("h6", { children: "Who I Follow: " }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'row justify-content-center' }, { children: whoIFollow }))] }));
};
exports.default = UsersPage;
