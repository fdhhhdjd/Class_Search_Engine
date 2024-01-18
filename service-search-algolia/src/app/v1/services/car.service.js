/* eslint-disable security/detect-object-injection */
'use strict';

//* IMPORT
const index = require('../../../dbs');

class CarService {
    static async searchAll({ query }) {
        const searchQuery = {
            attributesToHighlight: ['make', 'model'],
            attributesToSnippet: ['content:2'],
            attributesToRetrieve: ['make', 'model'],
            typoTolerance: 'min',
        };

        const result = await index.search(query, searchQuery);
        return result;
    }

    static async getAllCars() {
        const objects = [];
        await index.browseObjects({
            query: '',
            batch: (response) => {
                objects.push(...response);
            },
        });

        return objects;
    }

    static async getDetailId({ id }) {
        const result = await index.getObject(id);
        return result;
    }

    static async create({ make, model, image, description }) {
        const result = await index
            .saveObjects([{ make, model, image, description }], { autoGenerateObjectIDIfNotExist: true })
            .then((result) => result)
            .catch((err) => err);

        return result;
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
