import express, {NextFunction, Request, Response} from 'express';
import { Server } from 'http';
//const { Pool } = require('pg');
import LearningPackage from './LearningPackage';
import LearningFact from "./LearningFact";
import './dbSync';

const app = express();
app.use(express.json());// Middleware to parse JSON request body
const port = 3000;

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
});

app.get('/api/liveness', (_req, res) => {
    res.status(200).send('OK');
});

/*
interface LearningFact {
    // No additional properties at this stage
}

 */

// no longer needed
/*
interface LearningPackage {
    id: number;
    title: string;
    description: string;
    category: string;
    targetAudience: string;
    difficultyLevel: number;
}

 */

interface UserPackageLearning {
    startDate: Date;
    expectedEndDate: Date;
    minutesPerDayObjective: number;
}

interface UserLearningFact {
    timesReviewed: number;
    confidenceLevel: number;
    lastReviewedDate: Date;
}

// no longer needed
/*
const learningPackages: LearningPackage[] = [
    {
        id: 1,
        title: "Learn TypeScript",
        description: "Introduction to TypeScript programming language",
        category: "Programming",
        targetAudience: "Beginner",
        difficultyLevel: 10,
    },
    {
        id: 2,
        title: "Learn Node.js",
        description: "Introduction to Node.js and server-side JavaScript",
        category: "Web Development",
        targetAudience: "Intermediate",
        difficultyLevel: 15,
    },
    {
        id: 3,
        title: "Learn HTML",
        description: "Introduction to HTML markup language",
        category: "Web Development",
        targetAudience: "Beginner",
        difficultyLevel: 5,
    },
    {
        id: 4,
        title: "Learn Angular",
        description: "Introduction to the Angular framework",
        category: "Web Development",
        targetAudience: "Intermediate",
        difficultyLevel: 18,
    },
];

 */

// GET route to query all LearningPackages
app.get('/api/package', async (req: Request, res: Response) => {
    try {
        const learningPackages = await LearningPackage.findAll();
        res.json(learningPackages);
    } catch (error) {
        console.error('Error in findAll:', error);
        res.status(500).send('Internal Server Error');
    }
});

// GET route to query a specific LearningPackage by ID
app.get('/api/package/:id', async (req: Request, res: Response) => {
    const packageId = parseInt(req.params.id);
    try {
        const learningPackage = await LearningPackage.findByPk(packageId);
        if (learningPackage) {
            res.json(learningPackage);
        } else {
            res.status(404).send(`Entity not found for id: ${packageId}`);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// POST route to create a new LearningPackage
app.post('/api/package', async (req: Request, res: Response) => {
    const newPackage: LearningPackage = req.body;

    try {
        const createdPackage = await LearningPackage.create(newPackage);
        res.status(200).json(createdPackage);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// PUT route to update an existing LearningPackage
app.put('/api/package/:id', async (req: Request, res: Response) => {
    const packageId = parseInt(req.params.id);
    const updatedPackage: LearningPackage = req.body;

    try {
        const existingPackage = await LearningPackage.findByPk(packageId);

        if (!existingPackage) {
            res.status(404).send(`Entity not found for id: ${packageId}`);
            return;
        }

        await existingPackage.update(updatedPackage);
        res.status(200).json(existingPackage);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// GET route to query summaries of all LearningPackages
app.get('/api/package-summaries', async (req: Request, res: Response) => {
    try {
        const packageSummaries = await LearningPackage.findAll({
            attributes: ['id', 'title'],
        });
        res.json(packageSummaries);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// LEARNING FACTS ROUTES
app.get('/api/package/:id/fact', async (req: Request, res: Response) => {
    const packageId = parseInt(req.params.id);

    try {
        const learningFacts = await LearningFact.findAll({ where: { packageId } });
        if (learningFacts.length > 0) {
            res.json(learningFacts);
        } else {
            res.status(404).send(`No LearningFacts found for packageId: ${packageId}`);
        }
    } catch (error) {
        console.error('Error in findAll:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/package/:id/fact', async (req: Request, res: Response) => {
    const packageId = parseInt(req.params.id);
    const newFact: LearningFact = req.body;

    try {
        const createdFact = await LearningFact.create(newFact);
        res.status(200).json(createdFact);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.put('/api/package/:id/fact/:idf', async (req: Request, res: Response) => {
    const packageId = parseInt(req.params.id);
    const factId = parseInt(req.params.idf);
    const updatedFact: LearningFact = req.body;

    try {
        const existingFact = await LearningFact.findByPk(factId);

        if (!existingFact) {
            res.status(404).send(`Entity not found for package id: ${packageId} and fact id: ${factId}`);
            return;
        }

        await existingFact.update(updatedFact);
        res.status(200).json(existingFact);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/api/package/:id/fact/:idf', async (req, res) => {
    const packageId = parseInt(req.params.id);
    const factId = parseInt(req.params.idf);

    try {
        const existingFact = await LearningFact.findByPk(factId);

        if (!existingFact) {
            res.status(404).send(`Entity not found for package id: ${packageId} and fact id: ${factId}`);
            return;
        }

        // Instead of physically deleting the fact, mark it as disable=true
        existingFact.disable = true;
        await existingFact.save();

        res.status(200).json(existingFact);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// no longer needed
/*
const pool = new Pool({
    user: 'learningDbUser',
    host: 'localhost',
    database: 'LearningFactDb',
    password: 'password',
    port: 5432, // Default PostgreSQL port is 5432
});

pool.end((err) => {
    if (err) {
        console.error('Error closing the pool', err);
        return;
    }

    console.log('Database connection pool closed');
});

 */