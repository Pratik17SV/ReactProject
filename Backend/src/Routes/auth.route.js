import express from 'express';

const router = express.Router();

router.get('/Signup', (req, res) => {
    res.send('SignUP route working');
  });

  router.get('/Login', (req, res) => {
    res.send('Login route working');
  });

  router.get('/Logout', (req, res) => {
    res.send('Logout route working');
  });

export default router;