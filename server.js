const express = require('express')
const next = require('next')
var qs = require('querystring');
var faker = require('faker');
var fs = require('fs');
const PAGE_ITEMS = 100;
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

let data = [];
const iter_num = 1000;
const queryFaker = (params) => {
  let arr = [];
  for(let i = 0; i < iter_num; i ++) {
    const o = {id: params * iter_num + (i + 1), name: faker.name.findName(), avatar: faker.image.avatar() }
    arr = [...arr, o];
  }
  return arr;
}

for(i = 0; i < 10; i++) {
  console.log('i',i)
  data = [...data, ...queryFaker(i)]  
}

app.prepare()
.then(() => {
  const server = express()

  server.get('/', (req, res) => {
      return app.render(
        req, 
        res, 
        '/',
        {
          page: 0
        }
      ); 
  })
  
  server.get('/:page', (req, res, next) => {
    const page = parseInt(req.params.page);
    if(page > 0 && page <= data.length/PAGE_ITEMS )
      return app.render(
        req, 
        res, 
        '/',
        {
          page: req.params.page - 1
        }
      );
    next();
  });

  server.get('/api/users', (req, res) => {
    let url_parts = require('url').parse(req.url, true);
    const page = parseInt(url_parts.query.page)

    res.send({
      data: data.slice(page * PAGE_ITEMS, (page + 1) * PAGE_ITEMS),
      length: data.length
    }) 
  })

  server.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const i = data.findIndex(o => o.id === id)
    res.setHeader('Content-Type', 'application/json');
    name = data[i].name;
    avatar = data[i].avatar;
    res.send({ id, name, avatar});
  })

  server.post('/api/users/:id', (req, res) => {
    let body = '';
    req.on('data', d => body += d )
    req.on('end', () => { 
      const post = require('querystring').parse(body)
      const {name} = post;
      const id = parseInt(req.params.id);
      const i = data.findIndex(o => o.id === id)
      data[i].name = name;
      res.setHeader('Content-Type', 'application/json');
      res.send({ id: id, name});
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})