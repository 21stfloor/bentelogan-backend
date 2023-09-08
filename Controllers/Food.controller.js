const mongoose = require('../db');
const foodSchema = require('../Models/Food.model');
const Food = mongoose.model('Food', foodSchema);

function createFood(req,res) {

    const foodSchema = new Food(req.body);

    foodSchema.save()
    .then(() => {
        res.status(201).json({ message: 'Food created successfully' });
    })
    .catch((err) => {
        res.status(417).json({ error: err });
    });
}

async function readFood(req, res) {
    const foodId = req.params.id;

    try {
        const food = await Food.findById(foodId);

        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }

        res.status(200).json(food);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateFood(req, res) {
    const foodId = req.params.foodId;
    const updatedFields = req.body;

    try {
        const food = await Food.findOneAndUpdate({ foodId }, updatedFields, { new: true });

        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }

        res.status(200).json(food);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteFood(req, res) {
    const foodId = req.params.foodId;

    try {
        const food = await Food.findOneAndDelete({ foodId });

        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }

        res.status(204).send('The food has been successfully deleted');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function searchFood(req, res){
    try {
      const filters = {};
  
      // Iterate through all query parameters and add them to the filters
      for (const key in req.query) {
        if (req.query[key] !== '') {
          filters[key] = req.query[key];
        }
      }
  
      // Use the filters to build the Mongoose query
      const foods = await Food.find(filters);
  
      res.json(foods);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

module.exports = {
    createFood,
    readFood,
    updateFood,
    deleteFood,
    searchFood
}
