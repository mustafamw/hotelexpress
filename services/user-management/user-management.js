import mongoose from 'mongoose';
import { UserManagementSchema } from '../../mongoose/model/user-management-schema';
const HttpStatus = require('http-status-codes');

const UserManagement = mongoose.model('user-management', UserManagementSchema);


export class UserManagementService {

    constructor() {

    }

    insert(data) {

        const userManagement = new UserManagement();
        userManagement.email = data.email;
        userManagement.givenName = data.givenName;
        userManagement.familyName = data.familyName;

        return new Promise((resolve, reject) => {
            userManagement.save((err) => {
                if (err) {
                    return this.rejected(reject, "Techinal Error", HttpStatus.INTERNAL_SERVER_ERROR);
                }
                return this.resolved(resolve, { message: "Successfully Inserted" });
            });
        });
    }

    update(data) {
        return new Promise((resolve, reject) => {
            const query = this.query(data, reject);
            delete data.id;
            const newValue = { 
                $set: { 
                    data
                } 
            };
            UserManagement.findOneAndUpdate(query, newValue, (err, res) => {
                if (err) {
                    return this.rejected(reject, "Techinal Error", HttpStatus.INTERNAL_SERVER_ERROR);
                }
                if (res) {
                    return this.resolved(resolve, { message: "Successfully Updated" });
                }
                return this.rejected(reject, "Record Not Found", HttpStatus.NOT_FOUND);
            });
        });
    }

    find(data) {
        return new Promise((resolve, reject) => {
            const query = this.query(data, reject);
            UserManagement.find(query, (err, res) => {
                if (err) {
                    return this.rejected(reject, "Technical Error", HttpStatus.INTERNAL_SERVER_ERROR);
                }
                if (res && res.length > 0) {
                    if (res.length == 1) {
                        return this.resolved(resolve, res[0]);
                    }
                    if (res.length > 1) {
                        return this.resolved(resolve, res);
                    }
                }
                return this.rejected(reject, "Record Not Found", HttpStatus.NOT_FOUND);
            });
        });
    }

    delete(data) {
        return new Promise((resolve, reject) => {
            const query = this.query(data, reject);
            UserManagement.remove(query, (err, res) => {
                if (err) {
                    return this.rejected(reject, "Technical Error", HttpStatus.INTERNAL_SERVER_ERROR);
                }
                if (res) {
                    if (res.deletedCount == 0) {
                        return this.rejected(reject, "Record Not Found", HttpStatus.NOT_FOUND);
                    }
                    if (res.deletedCount > 0) {
                        if(res.deletedCount == 1){
                            return this.resolved(resolve, { message: "Record Deleted" });
                        }else{
                            return this.resolved(resolve, { message: "All Record Deleted" });
                        }
                    }
                }
            });
        });
    }

    query(query, reject){
        let data = {};
        try {
            if (query && query.id.length > 0 && !mongoose.Types.ObjectId.isValid(query.id)) {
                throw Error;
            }
            if (query !== undefined && query !== null && Object.keys(query).length > 0) {
                data = { "_id": query.id };
            }
        } catch (err) {
            return this.rejected(reject, "Incorrect ID", HttpStatus.BAD_REQUEST);
        }
        return data;
    }

    resolved(resolve, message) {
        resolve(message);
        return;
    }

    rejected(reject, message, statusCode) {
        reject({
            message: message,
            statusCode: statusCode
        });
        return;
    }
}