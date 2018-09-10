import {Request, Response} from 'express';
import express from 'express';
import * as dao from './ers_dao';

export const ersRouter = express.Router();


ersRouter.get('', [
    async (req, resp: Response) => {
        try
        {
            let users = await dao.getusers();
            resp.json(users);
        }
        catch(err)
        {
            console.log(err);
            resp.sendStatus(500);
        }
    }
]);

ersRouter.post('/sign-in', async (req, resp) => {
    try
    {
        const user = await dao.verifyUser(req.body.username, req.body.password);
        if(user)
        {
            resp.json(user);
        }
        else
        {
            resp.sendStatus(401);
        }
    }
    catch(err)
    {
        console.log(err);
        resp.sendStatus(500);
    }
});

ersRouter.post("/register", async (req, resp) => {
    try
    {
        const user = await dao.create(req.body);
        if(user)
        {
            resp.sendStatus(200);
        }
        else
        {
            resp.sendStatus(401);
        }
    }
    catch(err)
    {
        console.log(err);
        resp.sendStatus(500);
    }
})