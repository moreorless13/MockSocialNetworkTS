"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("@apollo/client");
const context_1 = require("@apollo/client/link/context");
const react_router_dom_1 = require("react-router-dom");
const Home_1 = __importDefault(require("./pages/Home"));
const Nav_1 = __importDefault(require("./components/Nav"));
const UsersPage_1 = __importDefault(require("./pages/UsersPage"));
const SignUpForm_1 = __importDefault(require("./components/forms/SignUpForm"));
const ForgotPasswordForm_1 = __importDefault(require("./components/forms/ForgotPasswordForm"));
const LoginForm_1 = __importDefault(require("./components/forms/LoginForm"));
const VerifyUser_1 = __importDefault(require("./pages/VerifyUser"));
const UserProfile_1 = __importDefault(require("./pages/UserProfile"));
const universal_cookie_1 = __importDefault(require("universal-cookie"));
const cookies = new universal_cookie_1.default();
const httpLink = (0, client_1.createHttpLink)({
    uri: '/graphql'
});
const authLink = (0, context_1.setContext)((_, { headers }) => {
    const token = localStorage.getItem('id_token') || cookies.get('id_token');
    return {
        headers: Object.assign(Object.assign({}, headers), { authorization: token ? `Bearer ${token}` : '' }),
    };
});
const client = new client_1.ApolloClient({
    link: authLink.concat(httpLink),
    cache: new client_1.InMemoryCache()
});
function App() {
    return ((0, jsx_runtime_1.jsx)(client_1.ApolloProvider, Object.assign({ client: client }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, Object.assign({ forceRefresh: true }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'container-fluid' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'container-fluid' }, { children: (0, jsx_runtime_1.jsx)(Nav_1.default, {}) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'container-fluid' }, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Switch, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: '/', component: Home_1.default }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: '/userPage', component: UsersPage_1.default }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: '/signup', component: SignUpForm_1.default }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: '/forgotPassword', component: ForgotPasswordForm_1.default }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: '/login', component: LoginForm_1.default }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: '/confirm/:userId', component: VerifyUser_1.default }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: '/profile/:userId', component: UserProfile_1.default })] }) }))] })) })) })));
}
exports.default = App;
