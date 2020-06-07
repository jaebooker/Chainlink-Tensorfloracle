"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0x/utils");
var EthereumTx = require("ethereumjs-tx");
var subprovider_1 = require("./subprovider");
var HEX_BASE = 16;
// tslint:disable-next-line:no-console
var defaultDebugCallback = function (debugPayload) { return console.debug(JSON.stringify(debugPayload, null, 2)); };
/**
 * This class implements the [web3-provider-engine](https://github.com/MetaMask/provider-engine) subprovider interface.
 * For every request, a object for debugging will be sent to the function specified in the constructor
 * Useful for debugging RPC requests which are not expecting as you expect.
 */
var DebugSubprovider = /** @class */ (function (_super) {
    __extends(DebugSubprovider, _super);
    function DebugSubprovider(debugCallback) {
        if (debugCallback === void 0) { debugCallback = defaultDebugCallback; }
        var _this = _super.call(this) || this;
        _this._debugCallback = debugCallback;
        return _this;
    }
    DebugSubprovider._generateRawTransactionAttributes = function (txn) {
        var hexBufferToString = function (value) { return new utils_1.BigNumber(value.toString('hex'), HEX_BASE).toString(); };
        return {
            gasLimit: hexBufferToString(txn.gasLimit),
            gasPrice: hexBufferToString(txn.gasPrice),
            nonce: hexBufferToString(txn.nonce),
            value: hexBufferToString(txn.value),
            to: "0x" + txn.to.toString('hex'),
        };
    };
    /**
     * This method conforms to the web3-provider-engine interface.
     * It is called internally by the ProviderEngine when it is this subproviders
     * turn to handle a JSON RPC request.
     * @param payload JSON RPC payload
     * @param next Callback to call if this subprovider decides not to handle the request
     * @param end Callback to call if subprovider handled the request and wants to pass back the request.
     */
    // tslint:disable-next-line:prefer-function-over-method async-suffix
    DebugSubprovider.prototype.handleRequest = function (payload, next, end) {
        return __awaiter(this, void 0, void 0, function () {
            var debugPayload, txn;
            return __generator(this, function (_a) {
                debugPayload = payload;
                if (payload.method === 'eth_sendRawTransaction' && payload.params[0]) {
                    txn = new EthereumTx(payload.params[0]);
                    debugPayload.rawTransactionAttributes = DebugSubprovider._generateRawTransactionAttributes(txn);
                }
                this._debugCallback(debugPayload);
                next();
                return [2 /*return*/];
            });
        });
    };
    return DebugSubprovider;
}(subprovider_1.Subprovider));
exports.DebugSubprovider = DebugSubprovider;
//# sourceMappingURL=debug_subprovider.js.map