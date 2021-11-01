import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.post(
  '/create-teacher',
  async (req, res) => {
    console.log('Request');

    try {
      const data = await Ctrl.createTeacher(req.body);
      res.status(200).json({
        status: 200,
        message: 'Successfully created teacher.'
      });
    } catch (status) {
      let message = '';
      switch (status) {
        case 500:
          message = 'Internal server error while creating teacher.';
          break;
        case 404:
          message = 'Cannot create teacher.';
          break;
      }
      res.status(status).json({ status, message });
    }
  }
);

router.post('/view-teacher', async (req, res) => {
  console.log('Request');
  try {
    const data = await Ctrl.viewTeacher(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully viewed teacher',
      data: data
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error while viewing teacher';
        break;
      case 404:
        message = 'Teacher not found';
        break;
    }
    res.status(status).json({ status, message });
  }
});


router.post('/view-teachers-by-dept', async (req, res) => {
  console.log('Request');
  try {
    const data = await Ctrl.viewTeachersByDept(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully viewed teacher',
      data: data
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error while viewing teachers';
        break;
      case 404:
        message = 'Teachers not found';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.post('/view-teachers-by-deptnyear', async (req, res) => {
  console.log('Request');
  try {
    const data = await Ctrl.viewTeachersByDeptAndYearLevel(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully viewed teachers',
      data: data
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error while viewing teachers';
        break;
      case 404:
        message = 'Teachers not found';
        break;
    }
    res.status(status).json({ status, message });
  }
});


router.post(
  '/edit-teacher',
  async (req, res) => {
    console.log('Request');

    try {
      const data = await Ctrl.editTeacher(req.body);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited teacher.'
      });
    } catch (status) {
      let message = '';
      switch (status) {
        case 500:
          message = 'Internal server error while editing teacher.';
          break;
        case 404:
          message = 'Cannot edit teacher.';
          break;
      }
      res.status(status).json({ status, message });
    }
  }
);


router.post(
  '/delete-teacher',
  async (req, res) => {
    console.log('Request');

    try {
      const data = await Ctrl.deleteTeacher(req.body);
      res.status(200).json({
        status: 200,
        message: 'Successfully deleted teacher.'
      });
    } catch (status) {
      let message = '';
      switch (status) {
        case 500:
          message = 'Internal server error while deleting teacher.';
          break;
        case 404:
          message = 'Cannot delete teacher.';
          break;
      }
      res.status(status).json({ status, message });
    }
  }
);



export default router;
