"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var ejs_1 = __importDefault(require("ejs"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '.env') });
var api_1 = __importDefault(require("./api"));
var models_1 = __importDefault(require("./models"));
var app = express_1.default();
app.set('port', process.env.PORT || 3000);
app.set('views', path_1.default.join(__dirname, 'views'));
app.engine('html', ejs_1.default.renderFile);
app.set('view engine', 'html');
models_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/', api_1.default());
app.listen(app.get("port"), function () {
    console.log("server running on port " + app.get("port"));
});
