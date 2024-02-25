import server from './server/server.js';

const app = new server();

app.get('user/:?id/:?name/', (req, res) => {
  res.json({ params: req.params }, 200);
})

app.error((req, res) => {
  res.text(`<h1>404 Not Found</h1><p>Route ${req.path} not found</p> `, 404);
});

app.listen({ host: 'localhost', port: 3000 }, () => {
  console.log(`Server is running on http://localhost:3000`);
});