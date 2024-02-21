import { MongoClient } from 'mongodb';

export const connectToCluster = async (uri) => {
    let mongoClient;

   try {
       mongoClient = new MongoClient(uri);
       console.log('Connecting to MongoDB Atlas cluster...');
       await mongoClient.connect();
       console.log('Successfully connected to MongoDB Atlas!');

       return mongoClient;
   } catch (error) {
       console.error('Connection to MongoDB Atlas failed!', error);
       process.exit();
   }
}

export const executeWebCrawlerCrudOperations = async () => {
    const uri = process.env.DB_URI;
    let mongoClient;
 
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('webcrawler')
        const collection = db.collection('weather')

        console.log('CREATE WeatherForecast')
        await createWebCrawlerDocument(collection)
    } finally {
        await mongoClient.close();
    }
   
}

export async function createWebCrawlerDocument(collection) {
    const forecastDocument = {
        currentTemperature: "24.4",
        icon: "//cdn.weatherapi.com/weather/64x64/day/353.png",
        locationName: "Crato",
        locationRegion: "Ceara",
        currentCondition: "Light rain shower",
    };
 
    await collection.insertOne(forecastDocument);
 }