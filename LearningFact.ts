import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';

interface LearningFactAttributes {
    id: number;
    factText: string;
    packageId: number; // Foreign key
    disable: boolean; // disable package instead of deleting it
}

class LearningFact extends Model<LearningFactAttributes> implements LearningFactAttributes {
    declare id: number;
    declare factText: string;
    declare packageId: number; // Foreign key
    declare disable: boolean;
}

LearningFact.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        factText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        packageId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        disable: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    {
        sequelize, // Pass the Sequelize instance
        modelName: 'LearningFact', // The name of the model/table
        tableName: 'LearningFact', // The actual SQL table name
        timestamps: false, // Set to true if you want to include timestamps
    }
);

export default LearningFact;