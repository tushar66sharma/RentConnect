const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const getIpAddress = require('./utils');
const mongoUrl =
  'mongodb+srv://alpanakushwaha02:mc2VA7K6Je5jfYgQ@cluster0.s3snwrj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const JWT_SECRET = 'uh349r34ri-[]dkeiof088f032ke-2l';

app.use(express.json());

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('Database Connected');
  })
  .catch(e => {
    console.log(e);
  });

require('./userDetails');
require('./item');

const User = mongoose.model('UserInfo');
const Item = mongoose.model('ItemInfo');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send({error: 'Unauthorized'});
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({error: 'Unauthorized'});
  }
};
// const serverIpAddress = getIpAddress(); // Get the IP address
// console.log(`Server IP Address: ${serverIpAddress}`);

// // Export the IP address to use it in other files
// module.exports = {serverIpAddress};

app.get('/', (req, res) => {
  res.send({status: 'Started'});
});

app.post('/register', async (req, res) => {
  const {email, password, name, mobileNo, rollNo} = req.body;
  const oldUser = await User.findOne({email: email});
  if (oldUser) {
    return res.send({data: 'User already exists!'});
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({
      email: email,
      password: encryptedPassword,
      name: name,
      mobileNo: mobileNo,
      rollNo: rollNo,
    });
    res.send({status: 'ok', data: 'User Created'});
  } catch (error) {
    res.send({status: 'error', data: error});
  }
});

app.post('/login-user', async (req, res) => {
  const {email, password} = req.body;
  const oldUser = await User.findOne({email: email});
  if (!oldUser) {
    return res.send({data: "User doesn't exist!"});
  }
  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign({email: oldUser.email, id: oldUser._id}, JWT_SECRET);
    return res.status(201).send({status: 'ok', data: token});
  } else {
    return res.status(401).send({error: 'Invalid credentials'});
  }
});

app.post('/userdata', async (req, res) => {
  const {token} = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;
    User.findOne({email: useremail}).then(data => {
      return res.send({status: 'Ok', data: data});
    });
  } catch (error) {
    return res.send({error: error});
  }
});

app.post('/items', authenticate, async (req, res) => {
  const {name, description, category, price, quantity, imageUrl} = req.body;
  const owner = req.user.id;
  if (!category || !price) {
    return res.status(400).send({error: 'Category and Price are required'});
  }
  try {
    const newItem = new Item({
      name,
      description,
      category,
      price,
      quantity,
      imageUrl,
      owner,
      flag: true, // Default flag to true (available)
    });
    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    res.status(500).send({message: error.message});
  }
});

// app.get("/items", authenticate, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const items = await Item.find({ owner: { $ne: userId } });
//     res.json(items);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });
app.get('/items', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await Item.find({
      owner: {$ne: userId},
      category: {$ne: 'Lost and Found'},
    });
    res.json(items);
  } catch (error) {
    res.status(500).send({message: error.message});
  }
});

app.get('/itemsSale', authenticate, async (req, res) => {
  try {
    const userId = req.user.id; // Retrieve user ID from the token
    const items = await Item.find({owner: userId}); // Fetch items uploaded by the logged-in user
    res.json(items);
  } catch (error) {
    res.status(500).send({message: error.message});
  }
});

app.get('/order-details/:itemId', authenticate, async (req, res) => {
  const {itemId} = req.params;
  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).send({error: 'Item not found'});
    }
    const user = await User.findById(item.owner);
    res.send({item, user});
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});

// app.patch("/order/:itemId/flag", authenticate, async (req, res) => {
//   const { itemId } = req.params;
//   try {
//     const item = await Item.findById(itemId);
//     if (!item) {
//       return res.status(404).send({ error: "Item not found" });
//     }
//     if (!item.flag) {
//       return res.status(400).send({ error: "Item is unavailable" });
//     }
//     item.flag = false; // Set flag to false (unavailable)
//     await item.save();
//     res.send({ status: "success", message: "Order placed successfully" });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

app.patch('/order/:itemId/update', authenticate, async (req, res) => {
  const {itemId} = req.params;
  const {orderQuantity} = req.body; // Correct extraction of orderQuantity and buyerId
  console.log('Order Quantity:', orderQuantity);
  // console.log('Buyer ID:', buyerId);

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).send({error: 'Item not found'});
    }
    if (item.quantity === 0) {
      return res.status(400).send({error: 'Item is unavailable'});
    }

    item.quantity -= orderQuantity;
    // item.BuyerId = mongoose.Types.ObjectId('669931d84f4625d8d09ba84c'); // Update BuyerId

    if (item.quantity <= 0) {
      item.quantity = 0;
      item.flag = false;
    }

    await item.save();
    res.status(200).send({message: 'Item updated successfully'});
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send({error: 'Failed to update item'});
  }
});
app.delete('/withdraw/:itemId', authenticate, async (req, res) => {
  const {itemId} = req.params;
  try {
    const item = await Item.findByIdAndDelete(itemId);
    if (!item) {
      return res.status(404).send({error: 'Item not found'});
    }
    res.send({status: 'success', message: 'Item deleted successfully'});
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});
app.get('/items/category/:category', authenticate, async (req, res) => {
  const {category} = req.params;
  try {
    const userId = req.user.id; // Retrieve user ID from the token
    const items = await Item.find({
      category: category,
      owner: {$ne: userId},
    });
    res.json(items);
  } catch (error) {
    res.status(500).send({message: error.message});
  }
});
app.get('/lostAndFound', async (req, res) => {
  try {
    const items = await Item.find({category: 'Lost and Found'});
    res.json(items);
  } catch (error) {
    res.status(500).send('Server error');
  }
});
app.get('/order-details/email/:email', async (req, res) => {
  const {email} = req.params;
  console.log({email});
  try {
    const user = await User.findOne({email});
    console.log(user);
    if (user) {
      res.status(200).json({user});
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({message: 'Internal server error'});
  }
});

app.listen(5001, () => {
  console.log('Node.js server started on port 5001');
});
