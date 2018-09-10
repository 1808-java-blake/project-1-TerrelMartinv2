import { Request, Response } from 'express';
import express from 'express';
import * as reimbursementDao from '../dao/ers_reimburse-dao';
import { authMiddleware } from '../security/authorization-middleware';

// all routes defiend with this object will imply /reimbursements
export const reimbursementRouter = express.Router(); // routers represent a subset of routes for the express application


/**
 * Find all reimbursement
 */
reimbursementRouter.get('', [
  authMiddleware(2),
  async (req: Request, resp: Response) => {
    try {
      console.log('retrieving all reimbursements');
      let movies = await reimbursementDao.findAll();
      resp.json(movies);
    } catch (err) {
      resp.sendStatus(500);
    }
  }]);

/**
 * Find movie by id
 */
// reimbursementRouter.get('/id', async (req: Request, resp: Response) => {
//   const id = +req.params.id; // convert the id to a number
//   console.log(`retreiving reimbursement with id  ${id}`)
//   try {
//     let movie = await reimbursementDao.findById(id);
//     if (movie !== undefined) {
//       resp.json(movie);
//     } else {
//       resp.sendStatus(400);
//     }
//   } catch (err) {
//     console.log(err);
//     resp.sendStatus(500);
//   }
// });

reimbursementRouter.get('/id', [
  async (req: Request, resp: Response) => {
  //const id = +req.params.id; // convert the id to a number
  try {
    console.log(req.session.user.ers_users_id);
    let reimb = await reimbursementDao.findById(req.session.user.ers_users_id);
    if (reimb !== undefined) {
      resp.json(reimb);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
}]);


/**
 * Create Movie
 */
reimbursementRouter.post('/submit', [
  //authMiddleware(1,2),
  async (req, resp) => {
    try {
      console.log("here")
      const id = await reimbursementDao.createReimbursement(req.body, req.session.user.ers_user_id);
      resp.status(201);
      resp.json(id);
    } catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  }])

  /* approve/deny reimbursement (Manager Only) */

  reimbursementRouter.post('/approved', [
    // authMiddleware(2),  
    async (req: Request, resp: Response) => {
      try {
        console.log(req.body.choice);
        let reimbs = await reimbursementDao.approveReimbursement(req.body.choice);
        resp.json(reimbs);
      } catch (err) {
        console.log('dont come here!')
        resp.sendStatus(500);
      }
    }]);

    reimbursementRouter.post('/denied', [
      // authMiddleware(2),
      async (req: Request, resp: Response) => {
        try {
          
          let reimbs = await reimbursementDao.denyReimbursement(req.body.choice);
          resp.json(reimbs);
        } catch (err) {
          console.log('you are here!')
          resp.sendStatus(500);
        }
      }]);


