import { UserManagementService } from '../../services/user-management/user-management';

const mapping = '/user';
const router = require('express').Router();
const userDatabase = new UserManagementService('user');

router.post(`${mapping}/create`, (req, res) => {
    const data = req.body;
    userDatabase.insert(data)
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.statusCode = error.statusCode;
        res.send(error);
    });
});

router.put(`${mapping}/update`, (req, res) => {
    const data = req.body;
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
    const data = {
        id: req.params.id
    };
    userDatabase.delete(data)
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.statusCode = error.statusCode;
        res.send(error);
    });
});

export const UserManagement = router;