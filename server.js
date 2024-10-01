
/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: __Rahul Subedi_____ Student ID: ___151355229____ Date: ___28-09-2024___
*
* Published URL: ___________________________________________________________
*
********************************************************************************/

const express = require('express');
const legoData = require('./modules/legoSets');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', __dirname + '/views');

legoData.initialize()
  .then(() => {
    
    app.get('/', (req, res) => {
      res.send('Assignment 2: Rahul Subedi - 151355229');
    });

    app.get('/lego/sets', (req, res) => {
      legoData.getAllSets()
        .then(sets => res.json(sets))
        .catch(err => res.status(500).send(err));
    });

    app.get('/lego/sets/num-demo', (req, res) => {
      legoData.getAllSets()
        .then(sets => {
          const set = sets.find(s => s.set_num === '1-Mar'); 
          if (set) {
            res.json(set);
          } else {
            res.status(404).send('Set not found');
          }
        })
        .catch(err => res.status(500).send(err));
    });

    
    app.get('/lego/sets/theme-demo', (req, res) => {
      legoData.getAllSets()
        .then(sets => {
          const filteredSets = sets.filter(s => 
            s.theme.toLowerCase().includes('town'.toLowerCase()) 
          );
          if (filteredSets.length > 0) {
            res.json(filteredSets);
          } else {
            res.status(404).send(err);
          }
        })
        .catch(err => res.status(500).send(err));
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize LEGO sets data:', err);
  });
