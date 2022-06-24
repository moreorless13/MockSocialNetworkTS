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
const Jumbotron_1 = __importDefault(require("../components/Jumbotron"));
const react_bootstrap_1 = require("react-bootstrap");
const UnfollowUserButton_1 = __importDefault(require("../components/buttons/UnfollowUserButton"));
const DeleteAccountForm_1 = __importDefault(require("../components/forms/DeleteAccountForm"));
const RemoveFollowerButton_1 = __importDefault(require("../components/buttons/RemoveFollowerButton"));
const CardHeader_1 = __importDefault(require("react-bootstrap/esm/CardHeader"));
const UsersPage = () => {
    let { data } = (0, client_1.useQuery)(queries_1.QUERY_ME);
    const [show, setShow] = (0, react_1.useState)(false);
    const handleShowRemoveAccount = () => setShow(true);
    const handleCloseRemoveAccount = () => setShow(false);
    console.log(data);
    const me = data === null || data === void 0 ? void 0 : data.me;
    console.log('this is me', me);
    const myPosts = me === null || me === void 0 ? void 0 : me.posts.map((post) => {
        console.log(post);
        const comments = post === null || post === void 0 ? void 0 : post.comments.map((comment) => {
            return ((0, jsx_runtime_1.jsx)(react_bootstrap_1.Row, Object.assign({ className: "mb-3" }, { children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card, { children: [(0, jsx_runtime_1.jsx)(CardHeader_1.default, Object.assign({ className: 'bg-danger text-white' }, { children: comment.author })), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Body, { children: comment.text })] }, comment === null || comment === void 0 ? void 0 : comment.owner) })));
        });
        return ((0, jsx_runtime_1.jsx)(react_bootstrap_1.Row, Object.assign({ className: "mb-3" }, { children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card, { children: [(0, jsx_runtime_1.jsx)(CardHeader_1.default, Object.assign({ className: 'bg-primary text-white' }, { children: post.author })), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Body, { children: post.text }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Footer, { children: comments })] }, post === null || post === void 0 ? void 0 : post._id) })));
    });
    const myFollowers = me === null || me === void 0 ? void 0 : me.followers.map((follower) => {
        console.log(follower);
        const handleClick = (event) => {
            event.preventDefault();
            window.location.assign(`/profile/${follower._id}`);
        };
        return ((0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card, Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card.Body, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Title, { children: follower.username }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Subtitle, { children: follower.email }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Button, Object.assign({ onClick: handleClick }, { children: [follower === null || follower === void 0 ? void 0 : follower.username, "'s Profile"] }))] }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Footer, { children: (0, jsx_runtime_1.jsx)(RemoveFollowerButton_1.default, { _id: follower === null || follower === void 0 ? void 0 : follower._id }) })] })));
    });
    const whoIFollow = me === null || me === void 0 ? void 0 : me.following.map((following) => {
        console.log(following);
        const handleClick = (event) => {
            event.preventDefault();
            window.location.assign(`/profile/${following._id}`);
        };
        return ((0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card, { children: [(0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card.Body, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Title, { children: following.username }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Subtitle, { children: following.email }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Button, Object.assign({ onClick: handleClick }, { children: [following === null || following === void 0 ? void 0 : following.username, "'s Profile"] }))] }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Footer, { children: (0, jsx_runtime_1.jsx)(UnfollowUserButton_1.default, { _id: following === null || following === void 0 ? void 0 : following._id }) })] }));
    });
    return (auth_1.default.loggedIn() ? ((0, jsx_runtime_1.jsxs)(Jumbotron_1.default, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'row justify-content-end' }, { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ onClick: () => handleShowRemoveAccount(), variant: 'danger' }, { children: "Delete Account" })), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Modal, Object.assign({ show: show, onHide: handleCloseRemoveAccount }, { children: (0, jsx_runtime_1.jsx)(DeleteAccountForm_1.default, {}) }))] }) })), (0, jsx_runtime_1.jsx)("h5", { children: "My Posts:" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'row justify-content-center' }, { children: myPosts })), (0, jsx_runtime_1.jsx)("h6", { children: "My Followers: " }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'row justify-content-center' }, { children: myFollowers })), (0, jsx_runtime_1.jsx)("h6", { children: "Who I Follow: " }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'row justify-content-center' }, { children: whoIFollow }))] })) : ((0, jsx_runtime_1.jsx)(Jumbotron_1.default, { children: (0, jsx_runtime_1.jsx)("h3", { children: " You Are not authorized" }) })));
};
exports.default = UsersPage;
