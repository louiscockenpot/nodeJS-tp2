"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    database: 'LearningFactDb',
    username: 'learningDbUser',
    password: 'password',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
});
exports.default = sequelize;
//# sourceMappingURL=sequelize.js.map