import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

interface Submission {
    name: string;
    email: string;
    phone: string;
    github_link: string;
    stopwatch_time: string;
}

const app = express();
const PORT: number = 3000;
const DB_FILE: string = path.join(__dirname, 'db.json');

app.use(express.json());
app.use(cors());

if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ submissions: [] }, null, 2));
}

app.get('/ping', (req: Request, res: Response) => {
    res.send(true);
});

app.post('/submit', (req: Request, res: Response) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body as Submission;

    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).send('Missing required fields');
    }

    const db: { submissions: Submission[] } = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    db.submissions.push({ name, email, phone, github_link, stopwatch_time });
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

    res.send('Submission received');  
});

app.get('/read', (req: Request, res: Response) => {
    const index: number = parseInt(req.query.index as string);

    const db: { submissions: Submission[] } = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    if (index < 0 || index >= db.submissions.length) {
        return res.status(404).send('Submission not found');
    }

    res.send(db.submissions[index]);
});

app.delete('/delete', (req: Request, res: Response) => {
    const index: number = parseInt(req.query.index as string);

    const db: { submissions: Submission[] } = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    if (index < 0 || index >= db.submissions.length) {
        return res.status(404).send('Submission not found');
    }

    db.submissions.splice(index, 1);
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

    res.send('Submission deleted');
});

app.put('/edit', (req: Request, res: Response) => {
    const index: number = parseInt(req.query.index as string);
    const { name, email, phone, github_link, stopwatch_time } = req.body as Submission;

    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).send('Missing required fields');
    }

    const db: { submissions: Submission[] } = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    if (index < 0 || index >= db.submissions.length) {
        return res.status(404).send('Submission not found');
    }

    db.submissions[index] = { name, email, phone, github_link, stopwatch_time };
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

    res.send('Submission updated');
});

app.get('/search', (req: Request, res: Response) => {
    const email: string = req.query.email as string;

    const db: { submissions: Submission[] } = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    const results: Submission[] = db.submissions.filter((submission) => submission.email.toLowerCase() === email.toLowerCase());

    if (results.length > 0) {
        res.send(results[0]);
    } else {
        res.status(404).send('Submission not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
