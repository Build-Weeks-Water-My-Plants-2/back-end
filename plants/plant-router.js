const plants = require("./plant-model");

const router = require("express").Router();

// ---POST----
router.post('/', (req, res) => {
    const plantsData = {
        user_id: req.decodedJwt.subject,
        nickname: req.body.nickname,
        species: req.body.species,
        h2O_frequency: req.body.h2O_frequency,
        last_watered_at: req.body.last_watered_at
    }

    if (!plantsData) {
        res.status(400).json({
            message: 'Please provide nickname/ species/ h20_freq/ last-watered info in order to continue'
        });
    } else {
        plants.add(plantsData)
            .then((newPlant) => {
                res.status(201).json(newPlant);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    errMessage: 'Houston, we have a problem! Error saving data'
                });
            })
    }
})

// ----GET-----
router.get('/', (req, res) => {
    plants.find(req.decodedJwt.subject)
        .then(plants => {
            res.status(200).json(plants);
        });
})

// ----GET----
router.get('/:id', (req, res) => {
    const id = req.params.id;

    plants.findById(id)
        .then(([plant]) => {
            if (plant) {
                res.status(200).json(plant);
            } else {
                res.status(404).json({
                    message: 'the ID provided does not match our records'
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                errMessage: 'Houston, we have a problem! Error while retrieving data'
            });
        })
})

//---PUT----
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = {
        nickname: req.body.nickname,
        species: req.body.species,
        h2O_frequency: req.body.h2O_frequency,
        last_watered_at: req.body.last_watered_at
    }

    if (!changes) {
        res.status(400).json({
            message: 'Please fill all required fields'
        });
    } else {
        plants.update(id, changes)
            .then((updated) => {
                if (updated) {
                    res.status(201).json(changes);
                } else {
                    res.status(404).json({
                        message: 'Plant was not found to update'
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    errMessage: 'Houston, we have a problem! Plant could not be added'
                });
            })
    }
})

//---DELETE----
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    plants.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(204).json({
                    message: 'Plant was removed successfully by user'
                });
            } else {
                res.status(404).json({
                    message: '404!, Plant not found'
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                errMessage: 'Houston, We have a problem! Error while deleting data'
            });
        })
})

module.exports = router;
