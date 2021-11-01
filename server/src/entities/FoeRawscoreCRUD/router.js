import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.post('/create-foe', async (req, res) => {
  console.log('Request');
  try {
    const data = await Ctrl.createFOE(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully created frequency of error',
      data: data
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error while creating foe';
        break;
      case 404:
        message = 'FOE not found';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.post('/view-foe', async (req, res) => {
  console.log('Request');
  try {
    const data = await Ctrl.viewFOE(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully viewed frequency of error',
      data: data
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error while viewing foe';
        break;
      case 404:
        message = 'FOE not found';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.post('/view-all-foe', async (req, res) => {
  console.log('Request');
  try {
    const data = await Ctrl.viewAllFOE(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully viewed frequency of error',
      data: data
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error while viewing foe';
        break;
      case 404:
        message = 'FOE not found';
        break;
    }
    res.status(status).json({ status, message });
  }
});


router.post(
  '/edit-foe',
  async (req, res) => {
    console.log('Request');

    try {
      const data = await Ctrl.editFOE(req.body);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited foe.'
      });
    } catch (status) {
      let message = '';
      switch (status) {
        case 500:
          message = 'Internal server error while editing foe.';
          break;
        case 404:
          message = 'Cannot edit foe.';
          break;
      }
      res.status(status).json({ status, message });
    }
  }
);




export default router;
