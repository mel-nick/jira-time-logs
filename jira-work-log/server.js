import open from 'open';
import express from 'express';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const __dirname = path.resolve();

const apiUrl = 'https://pgga-es.atlassian.net/rest/api/3';
const responseType = 'json';

const app = express();
app.listen(3000, () => {
  console.log('Application started and Listening on port 3000');
});
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/issues', (req, res) => {
  const url = `${apiUrl}/search?jql=worklogAuthor=currentUser()and worklogDate>=${req.query.startDate} and worklogDate<=${req.query.endDate}`;
  const token = `${req.query.userName}:${process.env.token}`;
  axios({
    url,
    responseType,
    headers: {
      Authorization: `Basic ${btoa(token)}`,
    },
  })
    .then((data) => res.json(data.data))
    .catch((error) => console.error(error));
});

app.get('/worklogs', (req, res) => {
  const url = `${apiUrl}/issue/${req.query.id}/worklog`;
  const token = `${req.query.userName}:${process.env.token}`;
  axios({
    url,
    responseType,
    headers: {
      Authorization: `Basic ${btoa(token)}`,
    },
  })
    .then((data) => res.json(data.data))
    .catch((error) => console.error(error));
});

(async () => {
  await open('http://localhost:3000', {
    app: ['google chrome'],
  });
})();
