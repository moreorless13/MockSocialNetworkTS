"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const mutations_1 = require("../../utils/mutations");
const client_1 = require("@apollo/client");
const FollowUserButton = ({ _id }) => {
    const [disabled, setDisabled] = (0, react_1.useState)(false);
    const [followUser, { error }] = (0, client_1.useMutation)(mutations_1.FOLLOW_USER);
    (0, react_1.useEffect)(() => {
        if (error) {
            setDisabled(true);
        }
        else {
            setDisabled(false);
        }
    }, [error]);
    const handleFollowClick = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        try {
            const { data } = yield followUser({
                variables: { _id: _id }
            });
            console.log('this is the data', data);
        }
        catch (error) {
            console.error(error);
        }
        setDisabled(true);
    });
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ variant: 'primary', onClick: handleFollowClick, disabled: disabled }, { children: "Follow" })) }));
};
exports.default = FollowUserButton;
