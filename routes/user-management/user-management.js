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
    const userDatabase = new UserDatabase('user');
    userDatabase.insert(data)
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.send(error);
    });
});

export const update = router.put('/update', (req, res) => {
    const data = req.body;
    const userDatabase = new UserDatabase('user');
    userDatabase.update(data)
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.statusCode = error.statusCode;
        res.send(error);
    });
});

export const list = router.get('/list', (req, res) => {
    const userDatabase = new UserDatabase('user');
    userDatabase.find()
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.statusCode = error.statusCode;
        res.send(error);
    });
});

export const listId = router.get('/list/:id', (req, res) => {
    const userDatabase = new UserDatabase('user');
    const data = {
        id: req.params.id
    }
    userDatabase.find(data)
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.statusCode = error.statusCode;
        res.send(error);
    });
});

export const deleteId = router.delete('/delete/:id', (req, res) => {
    const userDatabase = new UserDatabase('user');
    const data = {
        id: req.params.id
    }
    userDatabase.deleteId(data)
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.statusCode = error.statusCode;
        res.send(error);
    });
});

export const drop = router.delete('/delete', (req, res) => {
    const userDatabase = new UserDatabase('user');
    userDatabase.delete()
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.statusCode = error.statusCode;
        res.send(error);
    });
});