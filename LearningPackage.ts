import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';

interface LearningPackageAttributes {
    id: number;
    title: string;
    description: string;
    category: string;
    targetAudience: string;
    difficultyLevel: number;
}

class LearningPackage extends Model<LearningPackageAttributes> implements LearningPackageAttributes {
    declare id: number;
    declare title: string;
    declare description: string;
    declare category: string;
    declare targetAudience: string;
    declare difficultyLevel: number;
}

LearningPackage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        targetAudience: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficultyLevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize, // Pass the Sequelize instance
        modelName: 'LearningPackage', // The name of the model/table
        tableName: 'LearningPackage', // The actual SQL table name
        timestamps: false, // Set to true if you want to include timestamps
    }
);

export default LearningPackage;