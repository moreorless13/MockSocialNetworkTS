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
const UnfollowUserButton = ({ _id }) => {
    const [disabled, setDisabled] = (0, react_1.useState)(false);
    const [unfollowUser, { error }] = (0, client_1.useMutation)(mutations_1.UNFOLLOW_USER);
    (0, react_1.useEffect)(() => {
        if (error) {
            setDisabled(true);
        }
        else {
            setDisabled(false);
        }
    }, [error]);
    const handleUnfollowClick = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        console.log(_id);
        try {
            const { data } = yield unfollowUser({
                variables: { _id: _id }
            });
        }
        catch (error) {
            console.error(error);
        }
    });
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ variant: 'danger', onClick: handleUnfollowClick, disabled: disabled }, { children: "Unfollow" })) }));
};
exports.default = UnfollowUserButton;
