import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.post(
  '/create-itemanalysis',
  async (req, res) => {
    console.log('Request');

    try {
      const data = await Ctrl.createItemAnalysis(req.body);
      res.status(200).json({
        status: 200,
        message: 'Successfully created item analysis.',
        new_id: data
      });
    } catch (status) {
      let message = '';
      switch (status) {
        case 500:
          message = 'Internal server error while creating item analysis.';
          break;
        case 404:
          message = 'Cannot create item analysis.';
          break;
      }
      res.status(status).json({ status, message });
    }
  }
);

router.post('/view-itemanalysis', async (req, res) => {
  console.log('Request');
  try {
    const data = await Ctrl.viewItemAnalysis(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully viewed item analysis',
      data: data
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error while viewing item analysis';
        break;
      case 404:
        message = 'Item analysis not found';
        break;
    }
    res.status(status).json({ status, message });
  }
});


router.post('/view-all-itemanalysis', async (req, res) => {
  console.log('Request');
  try {
    const data = await Ctrl.viewAllItemAnalysis(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully viewed item analyses',
      data: data
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error while viewing item analyses';
        break;
      case 404:
        message = 'Item analyses not found';
        break;
    }
    res.status(status).json({ status, message });
  }
});


router.post(
  '/edit-itemanalysis',
  async (req, res) => {
    console.log('Request');

    try {
      const data = await Ctrl.editItemAnalysis(req.body);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited item analysis.'
      });
    } catch (status) {
      let message = '';
      switch (status) {
        case 500:
          message = 'Internal server error while editing item analysis.';
          break;
        case 404:
          message = 'Cannot edit item analysis.';
          break;
      }
      res.status(status).json({ status, message });
    }
  }
);


router.post(
  '/delete-itemanalysis',
  async (req, res) => {
    console.log('Request');

    try {
      const data = await Ctrl.deleteItemAnalysis(req.body);
      res.status(200).json({
        status: 200,
        message: 'Successfully deleted item analysis.'
      });
    } catch (status) {
      let message = '';
      switch (status) {
        case 500:
          message = 'Internal server error while deleting item analysis.';
          break;
        case 404:
          message = 'Cannot delete item analysis.';
          break;
      }
      res.status(status).json({ status, message });
    }
  }
);



export default router;
