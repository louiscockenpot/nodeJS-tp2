import LearningPackage from './LearningPackage';
import LearningFact from "./LearningFact";

export async function syncDatabase(): Promise<void> {
    try {
        await LearningPackage.sync({ alter: true });
        console.log('LearningPackage table synchronized');

        await LearningFact.sync({alter:true});
        console.log('LearningFact table synchronized')
    } catch (error) {
        console.error('Error synchronizing tables:', error);
    }
}

syncDatabase();