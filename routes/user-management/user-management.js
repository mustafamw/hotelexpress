import { router } from '../route/route';
import { UserDatabase } from '../../services/database/user';


/**
 * This function comment is parsed by doctrine
 * @route POST /
 * @group Create - Create a user details
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
export const create = router.post('/create', (req, res) => {
    const data = req.body;
    data.created = new Date();
    
    const userDatabase = new UserDatabase('user');
    userDatabase.insert([data])
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.send(error);
    });
});

export const get = router.get('/list', (req, res) => {
    const userDatabase = new UserDatabase('user');
    userDatabase.find()
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.send(error);
    });
});

export const update = router.post('/update', (req, res) => {
    res.send();
});

export const remove = router.post('/delete', (req, res) => {
    res.send();
});