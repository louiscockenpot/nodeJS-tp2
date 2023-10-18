"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
class LearningFact extends sequelize_1.Model {
}
LearningFact.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    factText: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    packageId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    disable: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'LearningFact',
    tableName: 'LearningFact',
    timestamps: false, // Set to true if you want to include timestamps
});
exports.default = LearningFact;
//# sourceMappingURL=LearningFact.js.map