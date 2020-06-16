const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Tip = require('../models/tip');
const ObjectId = mongoose.Types.ObjectId;

router.get('/tips', async (res, req) => {
    if (!req.params.type) {
        const tip = await Tip.find();        
        res.send(tip);
    }
    const tip = await Tip.find({type: req.params.type});
    res.send(tip)
});

router.get('/tips/:tipId', async (res) => {
    if (!ObjectId.isValid(req.params.tipId)) return res.status(422)
    .send(`Invalid ID`);

    const tip = await Tip.findById(req.params.tipId);
    if(!tip) return res.status(404).send('This tip does not exist.');
    
    res.send(tip);
});

router.post('/tips', async (res, req) => {
    let newTip = new Tip({
        type: req.body.type,
        category: req.body.category,
        description: req.body.description
    });

    newTip
        .save()
        .then(() => {
            res.send(newTip);
            console.log('Added a new ', req.body.category, ' tip')
          })
          .catch(error => {
              res.status(422).send(error)
          });
});

router.patch("/tips/:tipId", async (req, res) => {
    if (!ObjectId.isValid(req.params.tipId)) {
        return res.status(422).send("Invalid ID");
    }
    let fieldsToUpdate = {};

    if (req.body.type) {
        fieldsToUpdate.type = req.body.type;
      };
    if (req.body.category) {
      fieldsToUpdate.category = req.body.category;
    }
    if (req.body.description) {
        fieldsToUpdate.description = req.body.description;
      };
  
    try {
      var updatedTip = await Tip.findByIdAndUpdate(
        req.params.tipId,
        fieldsToUpdate,
        { new: true, runValidators: true }
      );
    } catch (error) {
        res.status(422).send(error);
    }
    if (updatedTip.length === 0) {
      return res.status(304).send('Tip was not modified.');
    }
    res.send(updatedTip);
  });

  router.delete('/:tipId', async (req,res)=>{
    if (!ObjectId.isValid(req.params.tipId)) return res.status(422)
        .send('Invalid ID');
  
    const tip = await Tip.findByIdAndDelete(req.params.tipId);
    if(!tip) return res.status(404).send("This tip does not exist.");
  
    res.send(tip);
  });
  
  module.exports = router;