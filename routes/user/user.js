import { UserManagement } from '../../services/user-management/user-management';

const mapping = '/user';

const router = require('express').Router();

router.post(`${mapping}/create`, (req, res) => {
    const data = req.body;
    const userDatabase = new UserManagement('user');
    userDatabase.insert(data)
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.send(error);
    });
});

router.put(`${mapping}/update`, (req, res) => {
    const data = req.body;
    const userDatabase = new UserManagement('user');
    userDatabase.update(data)
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.statusCode = error.statusCode;
        res.send(error);
    });
});

router.get(`${mapping}/list`, (req, res) => {
    const userDatabase = new UserManagement('user');
    userDatabase.find()
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.statusCode = error.statusCode;
        res.send(error);
    });
});

router.get(`${mapping}/list/:id`, (req, res) => {
    const userDatabase = new UserManagement('user');
    const data = {
        id: req.params.id
    };
    userDatabase.find(data)
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.statusCode = error.statusCode;
        res.send(error);
    });
});

router.delete(`${mapping}/delete`, (req, res) => {
    const userDatabase = new UserManagement('user');
    userDatabase.delete()
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.statusCode = error.statusCode;
        res.send(error);
    });
});

router.delete(`${mapping}/delete/:id`, (req, res) => {
    const userDatabase = new UserManagement('user');
    const data = {
        id: req.params.id
    };
    userDatabase.deleteId(data)
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.statusCode = error.statusCode;
        res.send(error);
    });
});

export const User = router;