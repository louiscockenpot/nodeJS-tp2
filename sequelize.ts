import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    database: 'LearningFactDb',
    username: 'learningDbUser',
    password: 'password',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
});

export default sequelize;