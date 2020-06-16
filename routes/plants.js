const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Plant = require('../models/plant');
const ObjectId = mongoose.Types.ObjectId;

router.get('/plants', async (res) => {                  
    const plant = await Plant
        .find();        
    res.send(plant);
});

router.get('/plants/:plantId', async (req, res) => {
    if (!ObjectId.isValid(req.params.plantId)) return res.status(422).send(`Invalid ID`);

    const plant = await Plant.findById(req.params.plantId);
    if(!plant) return res.status(404).send('This plant does not exist.');
    
    res.send(plant);   
});

router.get('/plants/:plantName', async (req, res) => {
    const plant = await Plant
        .findOne(req.params.plantName);
    if(!plant) return res.status(404).send('We did not expect you would be interested in this plant - contact us and we will add it in a future update!');
    res.send(plant);   
});

router.post('/plants', async (req,res)=>{    
    let old = await Plant.findOne({name: req.body.name});    
    if (old) {                               
        return res.send('This plant already exists in the database');
    };

    let newPlant = new Plant({
        name: req.body.name,
        category: req.body.category,
        earlyestPlantingDate: req.body.earlyestPlantingDate,
        latestPlantingDate: req.body.latestPlantingDate,
        image: req.body.image,
        description: req.body.description,
        minimumDaysToHarvest: req.body.minimumDaysToHarvest,
        stageSeed: req.body.stageSeed,
        stageSprout: req.body.stageSprout,
        stageGrowth: req.body.stageGrowth,
        plantSeed: req.body.plantSeed
      });
    
      newPlant
        .save()
        .then(() => {
          res.send(newPlant);
          console.log('Added a new plant: ', req.body.name)
        })
        .catch(error => {
            res.status(422).send(error)
        });
    
});

router.patch("/plants/:plantId", async (req, res) => {
    if (!ObjectId.isValid(req.params.plantId)) {
        return res.status(422).send("Invalid ID");
    }
    let fieldsToUpdate = {};

    if (req.body.name) {
        fieldsToUpdate.name = req.body.name;
      };
    if (req.body.category) {
      fieldsToUpdate.category = req.body.category;
    }
    if (req.body.earlyestPlantingDate) {
        fieldsToUpdate.description = req.body.earlyestPlantingDate;
      };
    if (req.body.latestPlantingDate) {
        fieldsToUpdate.description = req.body.latestPlantingDate;
      };
    if (req.body.image) {
        fieldsToUpdate.image = req.body.image;
      }
    if (req.body.description) {
      fieldsToUpdate.description = req.body.description;
    };
    if(req.body.minimumDaysToHarvest) {
      fieldsToUpdate.minimumDaysToHarvest = req.body.minimumDaysToHarvest
    }
    if (req.body.stageSeed) {
        fieldsToUpdate.stageSeed = req.body.stageSeed;
      };
    if (req.body.stageSprout) {
        fieldsToUpdate.stageSprout = req.body.stageSprout;
      };
    if (req.body.stageGrowth) {
        fieldsToUpdate.favorite = req.body.stageGrowth;
      };
    if (req.body.plantSeed) {
        fieldsToUpdate.favorite = req.body.plantSeed;
      }
  
    try {
      var updatedPlant = await Plant.findByIdAndUpdate(
        req.params.contentId,
        fieldsToUpdate,
        { new: true, runValidators: true }
      );
    } catch (error) {
        res.status(422).send(error);
    }
    if (updatedPlant.length === 0) {
      return res.status(304).send('Plant was not modified.');
    }
    res.send(updatedPlant);
  });

  router.delete('/:plantId', async (req,res)=>{
  if (!ObjectId.isValid(req.params.plantId)) return res.status(422).send('Invalid ID');

  const plant = await Plant.findByIdAndDelete(req.params.plantId);
  if(!plant) return res.status(404).send("This plant does not exist.");

  res.send(plant);
});

module.exports = router


// router.get('/crops/favorites', async (req, res) => {
//     const favoriteCrops = await Crop.find({favorite: true});
//     if(!favoriteCrops) return res.status(404).send("You did not add any plants to your favorite list yet!");

//     res.send(favoriteCrops);
// })