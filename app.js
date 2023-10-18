"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//const { Pool } = require('pg');
const LearningPackage_1 = __importDefault(require("./LearningPackage"));
const LearningFact_1 = __importDefault(require("./LearningFact"));
require("./dbSync");
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware to parse JSON request body
const port = 3000;
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
});
app.get('/api/liveness', (_req, res) => {
    res.status(200).send('OK');
});
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
app.get('/api/package', async (req, res) => {
    try {
        const learningPackages = await LearningPackage_1.default.findAll();
        res.json(learningPackages);
    }
    catch (error) {
        console.error('Error in findAll:', error);
        res.status(500).send('Internal Server Error');
    }
});
// GET route to query a specific LearningPackage by ID
app.get('/api/package/:id', async (req, res) => {
    const packageId = parseInt(req.params.id);
    try {
        const learningPackage = await LearningPackage_1.default.findByPk(packageId);
        if (learningPackage) {
            res.json(learningPackage);
        }
        else {
            res.status(404).send(`Entity not found for id: ${packageId}`);
        }
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
// POST route to create a new LearningPackage
app.post('/api/package', async (req, res) => {
    const newPackage = req.body;
    try {
        const createdPackage = await LearningPackage_1.default.create(newPackage);
        res.status(200).json(createdPackage);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
// PUT route to update an existing LearningPackage
app.put('/api/package/:id', async (req, res) => {
    const packageId = parseInt(req.params.id);
    const updatedPackage = req.body;
    try {
        const existingPackage = await LearningPackage_1.default.findByPk(packageId);
        if (!existingPackage) {
            res.status(404).send(`Entity not found for id: ${packageId}`);
            return;
        }
        await existingPackage.update(updatedPackage);
        res.status(200).json(existingPackage);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
// GET route to query summaries of all LearningPackages
app.get('/api/package-summaries', async (req, res) => {
    try {
        const packageSummaries = await LearningPackage_1.default.findAll({
            attributes: ['id', 'title'],
        });
        res.json(packageSummaries);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
// LEARNING FACTS ROUTES
app.get('/api/package/:id/fact', async (req, res) => {
    const packageId = parseInt(req.params.id);
    try {
        const learningFacts = await LearningFact_1.default.findAll({ where: { packageId } });
        if (learningFacts.length > 0) {
            res.json(learningFacts);
        }
        else {
            res.status(404).send(`No LearningFacts found for packageId: ${packageId}`);
        }
    }
    catch (error) {
        console.error('Error in findAll:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/api/package/:id/fact', async (req, res) => {
    const packageId = parseInt(req.params.id);
    const newFact = req.body;
    try {
        const createdFact = await LearningFact_1.default.create(newFact);
        res.status(200).json(createdFact);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
app.put('/api/package/:id/fact/:idf', async (req, res) => {
    const packageId = parseInt(req.params.id);
    const factId = parseInt(req.params.idf);
    const updatedFact = req.body;
    try {
        const existingFact = await LearningFact_1.default.findByPk(factId);
        if (!existingFact) {
            res.status(404).send(`Entity not found for package id: ${packageId} and fact id: ${factId}`);
            return;
        }
        await existingFact.update(updatedFact);
        res.status(200).json(existingFact);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
app.delete('/api/package/:id/fact/:idf', async (req, res) => {
    const packageId = parseInt(req.params.id);
    const factId = parseInt(req.params.idf);
    try {
        const existingFact = await LearningFact_1.default.findByPk(factId);
        if (!existingFact) {
            res.status(404).send(`Entity not found for package id: ${packageId} and fact id: ${factId}`);
            return;
        }
        // Instead of physically deleting the fact, mark it as disable=true
        existingFact.disable = true;
        await existingFact.save();
        res.status(200).json(existingFact);
    }
    catch (error) {
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
//# sourceMappingURL=app.js.map