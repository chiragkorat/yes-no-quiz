import React, { useState } from 'react';
import { QUESTIONS } from './questions';
import { Button, Card, CardContent, Typography } from '@mui/material';

const Quiz: React.FC = () => {
    const [answers, setAnswers] = useState<boolean[]>(new Array(Object.keys(QUESTIONS).length).fill(false));
    const [averageRating, setAverageRating] = useState<number | null>(null);

    const calculateScore = () => {
        const yesCount = answers.filter(answer => answer).length;
        return (yesCount / Object.keys(QUESTIONS).length) * 100;
    };

    const saveRating = () => {
        const ratings = localStorage.getItem('ratings');
        const rating = calculateScore();
        if (ratings) {
            const parsedRatings = JSON.parse(ratings) as number[];
            localStorage.setItem('ratings', JSON.stringify([...parsedRatings, rating]));
        } else {
            localStorage.setItem('ratings', JSON.stringify([rating]));
        }
    };

    const calculateAverageRating = () => {
        const ratings = localStorage.getItem('ratings');
        if (ratings) {
            const parsedRatings = JSON.parse(ratings) as number[];
            const average = parsedRatings.reduce((acc, curr) => acc + curr, 0) / parsedRatings.length;
            setAverageRating(average);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom>Quiz</Typography>
                    {Object.keys(QUESTIONS).map((key, index) => (
                        <div key={key} style={{ marginBottom: '20px' }}>
                            <Typography variant="body1">{QUESTIONS[parseInt(key)]}</Typography>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                <Button
                                    variant={answers[index] ? 'contained' : 'outlined'}
                                    color="success"
                                    onClick={() => setAnswers([...answers.slice(0, index), true, ...answers.slice(index + 1)])}
                                    style={{ marginRight: '10px' }}
                                >
                                    Yes
                                </Button>
                                <Button
                                    variant={!answers[index] ? 'contained' : 'outlined'}
                                    color="error"
                                    onClick={() => setAnswers([...answers.slice(0, index), false, ...answers.slice(index + 1)])}
                                >
                                    No
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Typography variant="body1" align="center">Score: {calculateScore()}%</Typography>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button variant="contained" onClick={saveRating}>Save Rating</Button>
                        <Button variant="contained" onClick={calculateAverageRating} style={{ marginLeft: '10px' }}>Calculate Average Rating</Button>
                    </div>
                    {averageRating !== null && <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>Average Rating: {averageRating.toFixed(2)}%</Typography>}
                </CardContent>
            </Card>
        </div>
    );
};

export default Quiz;
