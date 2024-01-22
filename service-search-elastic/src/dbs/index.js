//* LIB
const { Client } = require('@elastic/elasticsearch');

//* IMPORT
const { NameIndex } = require('../common/index/cars');

const client = new Client({
    node: process.env.CONNECT_ELASTICSEARCH,
});

createCarsIndex = async () => {
    const indexName = NameIndex;

    try {
        const indexExists = await client.indices.exists({
            index: indexName,
        });

        if (indexExists) {
            console.info(`Index "${indexName}" already exists.`);
        } else {
            await client.indices.create({
                index: indexName,
                body: {
                    mappings: {
                        properties: {
                            make: { type: 'text' },
                            model: { type: 'text' },
                            image: { type: 'text' },
                            description: { type: 'text' },
                        },
                    },
                },
            });
            console.info(`Index "${indexName}" created successfully.`);
        }
    } catch (error) {
        console.error('Error checking/creating index:', error);
    }
};

createCarsIndex();

module.exports = client;
