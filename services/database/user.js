import { MongoDB } from '../../mongodb/mongodb';
export class UserDatabase {

    constructor(collectionName){
        this.collectionName = collectionName;
        this.dbo = MongoDB.db;
    }

    insert(data){
        return new Promise((resolve, reject) => {
            this.dbo.collection(this.collectionName).insertMany(data, (err, res) => {
                if (err) reject(err);
                resolve({message : "Successfully Inserted"});
            });
        });
    }

    find () {
        return new Promise((resolve, reject) => {
            this.dbo.collection(this.collectionName).find().toArray((err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}