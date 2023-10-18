"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDatabase = void 0;
const LearningPackage_1 = __importDefault(require("./LearningPackage"));
const LearningFact_1 = __importDefault(require("./LearningFact"));
async function syncDatabase() {
    try {
        await LearningPackage_1.default.sync({ alter: true });
        console.log('LearningPackage table synchronized');
        await LearningFact_1.default.sync({ alter: true });
        console.log('LearningFact table synchronized');
    }
    catch (error) {
        console.error('Error synchronizing tables:', error);
    }
}
exports.syncDatabase = syncDatabase;
syncDatabase();
//# sourceMappingURL=dbSync.js.map