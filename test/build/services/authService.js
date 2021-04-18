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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("../models/user"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var email_1 = __importDefault(require("../config/email"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var LocalStorage = require('node-localstorage').LocalStorage, localStorage = new LocalStorage('./src/token');
var generateRandom = function () {
    var ranNum = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
    return ranNum;
};
var rancode = generateRandom();
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.userCreate = function (user, code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(user);
                        if (!(Number(code) == rancode)) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_1.default.create({
                                email: user.email,
                                nick: user.nick,
                                password: user.password,
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, "/"];
                    case 2: return [2 /*return*/, "code was wrong"];
                }
            });
        });
    };
    AuthService.prototype.join = function (nick, email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, user, mailOptions, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 12)];
                    case 1:
                        hash = _a.sent();
                        user = {
                            nick: nick,
                            email: email,
                            password: hash,
                        };
                        mailOptions = {
                            from: "TEST.site",
                            to: email,
                            subject: "이메일 인증번호",
                            text: "\uC774\uBA54\uC77C \uC778\uC99D\uBC88\uD638: " + rancode
                        };
                        return [4 /*yield*/, email_1.default.sendMail(mailOptions)];
                    case 2:
                        result = _a.sent();
                        email_1.default.close();
                        console.log(result);
                        return [2 /*return*/, user];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // public userCreate(nick: string, email: string, password: string): object{
    //     const user = {
    //         nick,
    //         email,
    //         password,
    //     }
    //     return user;
    // }   
    AuthService.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var TOKEN_SECRET, dbUser, user, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        TOKEN_SECRET = process.env.TOKEN_SECRET;
                        console.log(email);
                        return [4 /*yield*/, user_1.default.findOne({
                                email: email,
                            })];
                    case 1:
                        dbUser = _a.sent();
                        user = {
                            nick: dbUser === null || dbUser === void 0 ? void 0 : dbUser.nick,
                            email: dbUser === null || dbUser === void 0 ? void 0 : dbUser.email,
                        };
                        if (localStorage.getItem('token')) {
                            localStorage.clear();
                        }
                        if (!((dbUser === null || dbUser === void 0 ? void 0 : dbUser.password) && TOKEN_SECRET)) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt_1.default.compare(password, dbUser === null || dbUser === void 0 ? void 0 : dbUser.password)];
                    case 2:
                        if (_a.sent()) {
                            token = jsonwebtoken_1.default.sign(user, TOKEN_SECRET, { expiresIn: '10m', issuer: 'me' });
                            localStorage.setItem("token", token);
                            console.log(token);
                        }
                        _a.label = 3;
                    case 3:
                        console.log(user);
                        return [2 /*return*/, "/"];
                }
            });
        });
    };
    return AuthService;
}());
exports.default = AuthService;
