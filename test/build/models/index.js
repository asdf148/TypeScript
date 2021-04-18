"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var _a = process.env, MONGO_ID = _a.MONGO_ID, MONGO_PASSWORD = _a.MONGO_PASSWORD, NODE_ENV = _a.NODE_ENV; //애들을 못 가지고 옴 
var MONGO_URL = "mongodb://" + MONGO_ID + ":" + MONGO_PASSWORD + "@localhost:27017/admin";
var connect = function () {
    if (NODE_ENV !== 'production') {
        mongoose_1.default.set("debug", true);
    }
    mongoose_1.default.connect(MONGO_URL, {
        dbName: 'ts_test',
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }, function (error) {
        if (error) {
            console.log(process.env.MONGO_URL);
            console.log(MONGO_URL);
            console.log('몽고디비 연결 에러', error);
        }
        else {
            console.log('몽고디비 연결 성공');
        }
    });
};
mongoose_1.default.connection.on("error", function (error) {
    console.error('몽고디비 연결 에러', error);
});
// mongoose.connection.on('disconnected', ()=>{
//     console.log('몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.');
//     connect();
// });
exports.default = connect;
