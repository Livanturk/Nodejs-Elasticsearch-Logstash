const fs = require('fs')
const parse = require('csv-parser')
const { Client } = require('elasticsearch')
const log = console.log.bind(console)

const client = new Client({
    node: 'http://localhost:9200',
    log: 'trace'
});

const createIndex = async () => {
    try {
        const indexResponse = await client.indices.create({ index: 'your_index_name' });
        console.log(indexResponse);
    } catch (err) {
        throw err
    }
}


const indexDataset = async () => {
    try {
        fs.createReadStream('african_crises.csv')
        .pipe(parse())
        .on('data', async (row) => {
            try {
                const indexResponse = await client.index({
                    index: 'bank_crisis',
                    body: row
                })
                conseol.log(indexResponse)
            } catch (err){
                throw err
            }
        })
        .on('end', () => {
            console.log('Data indexing completed.')
        })
    } catch (err) {
        throw err
    }
}


const searchData = async () => {
    try {
        const result = await client.search({
            index: 'bank_crisis',
            body: {
                query: {
                    match: {
                      name: ''
                    }
                }
            }
        })
        console.log(result)
    } catch (err) {
        throw err
    }
};

async function main() {
    await createIndex()
    await indexDataset()
    await searchData()
    finishConnection()
}

function finishConnection() {
    client.close()
}

(async () => {
    log('Starting the system...')
    await main()
    log('Attempt Successful.')
})()