/* eslint-disable security/detect-object-injection */
'use strict';

//* IMPORT
const index = require('../../../dbs');

class CarService {
    static async getAllCars() {
        return index.search('');
    }

    static async getDetailId({ id }) {
        return index.getObject(id);
    }

    static async create({ make, model, image, description }) {
        return index
            .saveObjects([{ make, model, image, description }], { autoGenerateObjectIDIfNotExist: true })
            .then((result) => result)
            .catch((err) => err);
    }

    static async update({ id, make, model, image, description }) {
        const updatedObject = {
            objectID: id,
            make,
            model,
            image,
            description,
        };

        return index
            .saveObject(updatedObject)
            .then(({ objectID }) => `Object with objectID ${objectID} updated successfully.`)
            .catch((err) => err);
    }

    static async delete({ id }) {
        const objectIDToDelete = id;

        return index
            .deleteObject(objectIDToDelete)
            .then(() => `Object with objectID ${objectIDToDelete} deleted successfully.`)
            .catch((err) => {
                return err;
            });
    }
}

module.exports = CarService;
