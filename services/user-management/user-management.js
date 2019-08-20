import { MongoDB } from '../../mongodb/mongodb';
const ObjectId = require('mongodb').ObjectId;
const HttpStatus = require('http-status-codes');
export class UserManagement {

    constructor(collectionName) {
        this.collectionName = collectionName;
        this.dbo = MongoDB.db;
    }

    insert(data) {
        data.created = new Date();
        return new Promise((resolve, reject) => {
            this.dbo.collection(this.collectionName).insertOne(data, (err, res) => {
                if (err) this.throwError(reject, "Techinal Error", HttpStatus.INTERNAL_SERVER_ERROR);
                resolve({ message: "Successfully Inserted" });
            });
        });
    }

    update(data) {
        return new Promise((resolve, reject) => {
            let query = {};
            try {
                query = { "_id": ObjectId(data.id) };
            } catch (err) {
                this.throwError(reject, "Incorrect ID", HttpStatus.BAD_REQUEST);
            }
            delete data.id;
            const newvalues = {
                $set: data
            }
            this.dbo.collection(this.collectionName).updateOne(query, newvalues, (err, res) => {
                if (err) this.throwError(reject, "Techinal Error", HttpStatus.INTERNAL_SERVER_ERROR);
                if(res.matchedCount && res.matchedCount > 0){
                    resolve({ message: "Successfully Updated" });
                    return;
                }
                this.throwError(reject, "Record Not Found", HttpStatus.NOT_FOUND);
            });
        });
    }

    find(query) {
        return new Promise((resolve, reject) => {
            let data = {};
            try {
                if (query !== undefined && query !== null && Object.keys(query).length > 0) {
                    data = { "_id": ObjectId(query.id) };
                }
            } catch (err) {
                this.throwError(reject, "Incorrect ID", HttpStatus.BAD_REQUEST);
            }
            this.dbo.collection(this.collectionName).find(data).toArray((err, res) => {
                if (err) this.throwError(reject, "Technical Error", HttpStatus.INTERNAL_SERVER_ERROR);
                if(res && res.length > 0){
                    if(res.length == 1) resolve(res[0]);
                    if(res.length > 1) resolve(res);
                    return;
                }
                this.throwError(reject, "Record Not Found", HttpStatus.NOT_FOUND);
            });
        });
    }

    deleteId(query) {
        return new Promise((resolve, reject) => {
            let data = {};
            try {
                if (query !== undefined && query !== null && Object.keys(query).length > 0) {
                    data = { "_id": ObjectId(query.id) };
                }
            } catch (err) {
                this.throwError(reject, "Incorrect ID", HttpStatus.BAD_REQUEST);
            }
            this.dbo.collection(this.collectionName).deleteOne(data, (err, res) => {
                if (err) this.throwError(reject, "Technical Error", HttpStatus.INTERNAL_SERVER_ERROR);
                if(res.deletedCount && res.deletedCount > 0){
                    resolve({ message: "Record Deleted" });
                    return;
                }
                this.throwError(reject, "Record Not Found", HttpStatus.NOT_FOUND);
            });
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
            this.dbo.collection(this.collectionName).drop((err, res) => {
                if (err) this.throwError(reject, "Technical Error", HttpStatus.INTERNAL_SERVER_ERROR);
                if (res) resolve({ message: "All Record Deleted" });
                this.throwError(reject, "Record Not Found", HttpStatus.NOT_FOUND);
            });
        });
    }

    throwError(reject, message, statusCode) {
        reject({
            message: message,
            statusCode: statusCode
        });
        return;
    }
}