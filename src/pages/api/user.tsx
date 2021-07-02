//pages/api/user.tsx

import { NextApiRequest, NextApiResponse } from 'next';
import {UserRepository, NextUser} from '../../repositories/user-repository';

const Page = {index: 1, size: 100, order: 'asc'} as const;

export default (req: NextApiRequest, res: NextApiResponse) => {
    try{
        switch (req.method.toUpperCase()) {
            case "GET":
                _get(req,res);
                break;
            case "POST":
                _post(req,res);
                break;
            default:
                res.status(404).send("");
                break;
        }
    } catch (e){
        // make some logs
        console.debug("error");
        console.debug(e);
        res.status(500).send("");
    }
};

async function _get(req: NextApiRequest, res: NextApiResponse){
    let userRepository = new UserRepository();
    // let index = parseInt((req.query.index || Page.index).toString());
    let index = parseInt((req.query.index || Page.index).toString());
    let pageSize =  parseInt((req.query.pageSize || Page.size).toString());
    let order =  ((req.query.order )|| Page.order).toString();
    order = ['asc', 'desc'].includes(order)? order : 'asc';
    let pageData = await userRepository.getAllUsers(index, pageSize, order);

    res.status(200).json({status:"ok", data:pageData});
}

async function _post(req: NextApiRequest, res: NextApiResponse){
    let userRepository = new UserRepository();
    let user:NextUser= req.body as NextUser;
    let pageData = await userRepository.addUser(user);

    res.status(200).send({status:"ok", data:pageData});
}
