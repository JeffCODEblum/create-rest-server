#!/usr/bin/env node
const fs = require('fs');
const shell = require('shelljs');
const { exec } = require('child_process');
const appName = process.argv[2];
shell.mkdir('-p', process.cwd(), process.cwd() + '/' + appName);
shell.cd(process.cwd() + '/' + appName);
const boilerplateIndex = `
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.get('/get-data', (req, res) => {
  res.send({foo: 'bar'});
});

app.post('/post-data', (req, res) => {
    const reqBody = req.body;
    res.send(req.body);
});

app.delete('/delete-data/:id', (req, res) => {
    const reqBody = req.body;
    res.send(req.body);
});

app.put('/put-data/:id', (req, res) => {
    const id = req.params.id;
    res.send(id);
});

app.put('/patch-data', (req, res) => {
    const reqBody = req.body;
    res.send(req.body);
});

var server = app.listen(8081, () => {
   var host = server.address().address
   var port = server.address().port
   console.log("App running on http://%s:%s", host, port)
});
`;
fs.writeFile('index.js', boilerplateIndex, () => {});
const boilerplatePackage = `
{
    "name": "${appName}",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
    }
}
`;
fs.writeFile('package.json', boilerplatePackage, () => {});
exec('npm install --save express');
return;
