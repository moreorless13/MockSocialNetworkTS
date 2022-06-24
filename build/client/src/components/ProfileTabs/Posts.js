"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("@apollo/client");
const queries_1 = require("../../utils/queries");
const react_router_dom_1 = require("react-router-dom");
const react_bootstrap_1 = require("react-bootstrap");
const UsersPostsTab = () => {
    var _a;
    const { userId } = (0, react_router_dom_1.useParams)();
    const { data } = (0, client_1.useQuery)(queries_1.QUERY_USER, {
        variables: { userId: userId }
    });
    // console.log(data)
    const user = data === null || data === void 0 ? void 0 : data.user;
    console.log('users posts tab', user);
    const UsersPosts = (_a = user === null || user === void 0 ? void 0 : user.posts) === null || _a === void 0 ? void 0 : _a.map((post) => {
        console.log(post);
        const PostComments = post === null || post === void 0 ? void 0 : post.comments.map((comment) => {
            console.log('these are user comments', comment);
            const CommentDate = new Date(comment === null || comment === void 0 ? void 0 : comment.createdAt);
            return ((0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card, Object.assign({ className: 'mb-4' }, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Header, Object.assign({ className: 'bg-danger justify-content-center text-white' }, { children: comment === null || comment === void 0 ? void 0 : comment.author })), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card.Body, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Subtitle, Object.assign({ className: 'mb-3' }, { children: CommentDate.toLocaleDateString() })), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Subtitle, Object.assign({ className: 'mb-3' }, { children: CommentDate.toLocaleTimeString() })), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Text, { children: comment === null || comment === void 0 ? void 0 : comment.text })] })] }), comment === null || comment === void 0 ? void 0 : comment._id));
        });
        return ((0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card, Object.assign({ className: 'justify-content-center' }, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Header, Object.assign({ className: 'bg-primary' }, { children: post === null || post === void 0 ? void 0 : post.author }), post === null || post === void 0 ? void 0 : post.author), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Body, { children: post === null || post === void 0 ? void 0 : post.text }, post === null || post === void 0 ? void 0 : post.text), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Footer, { children: PostComments })] }), post === null || post === void 0 ? void 0 : post._id));
    });
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'row justify-content-center' }, { children: UsersPosts })));
};
exports.default = UsersPostsTab;
