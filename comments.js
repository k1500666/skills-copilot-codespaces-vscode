// Create web server
// Create comments
// Create get comments
// Create update comments
// Create delete comments

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.send('Error reading file');
        } else {
            res.send(data);
        }
    });
});

app.post('/comments', (req, res) => {
    const newComment = req.body;
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.send('Error reading file');
        } else {
            const comments = JSON.parse(data);
            comments.push(newComment);
            fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
                if (err) {
                    res.send('Error writing file');
                } else {
                    res.send('Comment added');
                }
            });
        }
    });
});

app.put('/comments/:id', (req, res) => {
    const id = req.params.id;
    const updatedComment = req.body;
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.send('Error reading file');
        } else {
            const comments = JSON.parse(data);
            const index = comments.findIndex(comment => comment.id === id);
            comments[index] = updatedComment;
            fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
                if (err) {
                    res.send('Error writing file');
                } else {
                    res.send('Comment updated');
                }
            });
        }
    });
});

app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.send('Error reading file');
        } else {
            const comments = JSON.parse(data);
            const index = comments.findIndex(comment => comment.id === id);
            comments.splice(index, 1);
            fs.writeFile('comments.json', JSON.stringify(comments
