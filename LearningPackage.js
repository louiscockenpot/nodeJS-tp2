"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
class LearningPackage extends sequelize_1.Model {
}
LearningPackage.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    targetAudience: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    difficultyLevel: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'LearningPackage',
    tableName: 'LearningPackage',
    timestamps: false, // Set to true if you want to include timestamps
});
exports.default = LearningPackage;
//# sourceMappingURL=LearningPackage.js.map