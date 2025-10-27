// import 'dotenv/config';
// import mongoose from 'mongoose';
// import {Product} from "@/models/product.model"
// import User from "@/models/user.model"
// import { Category } from "@/models/category.model"


// /**
//  * Connects to the database, cleans existing data, and seeds new data.
//  */
// export const seedDatabase = async () => {
//     const MONGODB_URI = process.env.MONGODB_URI;

//     if (!MONGODB_URI) {
//         console.error('Error: Please define the MONGODB_URI environment variable.');
//         process.exit(1); // Exit the script with an error code
//     }

//     try {
//         // 1. Connect to the database
//         console.log('Connecting to database...');
//         await mongoose.connect(MONGODB_URI);
//         console.log('Database connected successfully.');

//         // 2. Clean old data
//         console.log('Cleaning old data...');
//         await Promise.all([
//             Product.deleteMany({}),
//             User.deleteMany({}),
//             Category.deleteMany({}),
//         ]);
//         console.log('Old data cleaned.');

//         // 3. Seed new data
//         console.log('Seeding new data...');

//         const categories = await Category.insertMany([
//             { name: 'Electronics', description: 'Gadgets and devices' },
//             { name: 'Books', description: 'Printed and digital books' },
//             { name: 'Clothing', description: 'Apparel and accessories' },
//         ]);
//         const electronicsCat = categories.find(c => c.name === 'Electronics')!;
//         const clothingCat = categories.find(c => c.name === 'Clothing')!;

//         const users = await User.insertMany([
//             { name: 'Alice Johnson', email: 'alice@example.com' },
//             { name: 'Bob Williams', email: 'bob@example.com' },
//         ]);
//         const alice = users.find(u => u.name === 'Alice Johnson')!;
//         const bob = users.find(u => u.name === 'Bob Williams')!;

//         const productsToSeed = [
//             {
//                 name: 'Echo Dot (5th Gen) | Smart speaker with Alexa',
//                 description: 'Our most popular smart speaker with Alexa, the Echo Dot features a sleek design and improved audio for vibrant sound anywhere in your home.',
//                 brand: 'Amazon',
//                 category: electronicsCat._id,
//                 basePrice: 49.99,
//                 status: 'ACTIVE',
//                 thumbnail: 'https://m.media-amazon.com/images/I/71+ten3B+iL._AC_UY218_.jpg',
//                 images: [
//                     'https://m.media-amazon.com/images/I/71LpAY-33OL._AC_UY218_.jpg',
//                     'https://m.media-amazon.com/images/I/71C-Yxk-pJL._AC_UY218_.jpg',
//                 ],
//                 reviews: [
//                     { user: alice._id, name: alice.name, rating: 5, comment: 'Absolutely love it! The sound quality is amazing for its size.' },
//                     { user: bob._id, name: bob.name, rating: 4, comment: 'Great device, very helpful. Sometimes mishears commands.' },
//                 ],
//                 rating: 4.5,
//                 reviewCount: 2,
//                 stock: 150,
//                 tags: ['smart speaker', 'alexa', 'amazon echo'],
//                 isFeatured: true,
//                 attributes: new Map([['Color', 'Charcoal'], ['Connectivity', 'Bluetooth, Wi-Fi']]),
//             },
//             {
//                 name: 'Kindle Paperwhite (16 GB)',
//                 description: 'Now with a 6.8" display and thinner borders, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns.',
//                 brand: 'Amazon',
//                 category: electronicsCat._id,
//                 basePrice: 139.99,
//                 status: 'ACTIVE',
//                 thumbnail: 'https://m.media-amazon.com/images/I/61C+2-2M2QL._AC_UY218_.jpg',
//                 images: [],
//                 rating: 4.8,
//                 reviewCount: 1,
//                 reviews: [
//                      { user: alice._id, name: alice.name, rating: 5, comment: 'The best e-reader on the market. The warm light is a game-changer.' },
//                 ],
//                 variants: [
//                     { sku: 'KPW-16-BLK', priceModifier: 0, stock: 75, attributes: [{ name: 'Color', value: 'Black' }, {name: 'Storage', value: '16GB'}] },
//                     { sku: 'KPW-32-BLK', priceModifier: 20, stock: 40, attributes: [{ name: 'Color', value: 'Black' }, {name: 'Storage', value: '32GB'}] },
//                 ],
//                 stock: 0,
//                 tags: ['ereader', 'kindle', 'books'],
//             },
//             {
//                 name: 'Classic Cotton T-Shirt',
//                 description: 'A comfortable and durable t-shirt made from 100% premium cotton.',
//                 brand: 'Generic Apparel',
//                 category: clothingCat._id,
//                 basePrice: 19.99,
//                 status: 'ACTIVE',
//                 thumbnail: 'https://m.media-amazon.com/images/I/61f1Yf62b-L._AC_UL320_.jpg',
//                 images: [],
//                 rating: 0,
//                 reviewCount: 0,
//                 reviews: [],
//                 variants: [
//                     { sku: 'TS-RED-S', priceModifier: 0, stock: 50, attributes: [{ name: 'Color', value: 'Red' }, {name: 'Size', value: 'S'}] },
//                     { sku: 'TS-RED-M', priceModifier: 0, stock: 50, attributes: [{ name: 'Color', value: 'Red' }, {name: 'Size', value: 'M'}] },
//                     { sku: 'TS-BLU-M', priceModifier: 0, stock: 45, attributes: [{ name: 'Color', value: 'Blue' }, {name: 'Size', value: 'M'}] },
//                     { sku: 'TS-BLU-L', priceModifier: 2.5, stock: 30, attributes: [{ name: 'Color', value: 'Blue' }, {name: 'Size', value: 'L'}] },
//                 ],
//                 stock: 0,
//                 tags: ['shirt', 'clothing', 'apparel', 'cotton'],
//                 attributes: new Map([['Material', '100% Cotton']]),
//             }
//         ];
        
//         await Product.insertMany(productsToSeed);
//         console.log(`${productsToSeed.length} products have been seeded.`);

//         console.log('Database seeded successfully!');

//     } catch (error) {
//         console.error('Error during database operation:', error);
//         process.exit(1); // Exit with an error code
//     } finally {
//         // 4. Close the connection
//         await mongoose.disconnect();
//         console.log('Database connection closed.');
//     }
// };

// // Run the seeder
// src/seeds/seed.ts
import 'dotenv/config';
import mongoose from 'mongoose';
import { Product } from '@/models/product.model';
import User from '@/models/user.model';
import { Category } from '@/models/category.model';

/**
 * Split an array into chunks of size `size`.
 */
const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
};

/**
 * Convert Maps in product.attributes to plain objects (if any).
 * Also returns a shallow-cloned product so we don't mutate original objects.
 */
const normalizeProductForInsert = (p: any) => {
  const product = { ...p };

  // If attributes is a Map, convert to plain object
  if (product.attributes instanceof Map) {
    product.attributes = Object.fromEntries(product.attributes);
  }

  // If variants contain attribute maps, normalize them if needed
  if (Array.isArray(product.variants)) {
    product.variants = product.variants.map((v: any) => {
      const nv = { ...v };
      if (nv.attributes instanceof Map) {
        nv.attributes = Object.fromEntries(nv.attributes);
      }
      return nv;
    });
  }

  return product;
};

const insertInChunks = async <T,>(
  model: any,
  data: T[],
  batchSize = 200,
  modelName = 'Model'
) => {
  if (!Array.isArray(data) || data.length === 0) {
    console.log(`${modelName}: nothing to insert.`);
    return [];
  }

  const chunks = chunkArray(data, batchSize);
  const inserted: any[] = [];

  console.log(`${modelName}: inserting ${data.length} docs in ${chunks.length} batch(es) (batchSize=${batchSize})`);

  for (let i = 0; i < chunks.length; i++) {
    const batch = chunks[i];
    try {
      const res = await model.insertMany(batch, { ordered: false });
      inserted.push(...res);
      console.log(`${modelName}: batch ${i + 1}/${chunks.length} inserted (${batch.length} docs).`);
    } catch (err: any) {
      // insertMany with ordered:false can still throw for some driver-level errors; log and continue
      console.error(`${modelName}: batch ${i + 1}/${chunks.length} failed:`, err.message ?? err);
      // best-effort: try inserting individually to salvage valid docs (optional)
      for (const doc of batch) {
        try {
          const r = await model.create(doc);
          inserted.push(r);
        } catch (e: any) {
          console.error(`${modelName}: single doc insert failed:`, e.message ?? e);
        }
      }
    }
  }

  console.log(`${modelName}: finished inserting. Total inserted: ${inserted.length}`);
  return inserted;
};

/**
 * Connects to the database, cleans existing data, and seeds new data (chunked inserts).
 */
const seedDatabase = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  const BATCH_SIZE = Number(process.env.SEED_BATCH_SIZE ?? 200);

  if (!MONGODB_URI) {
    console.error('Error: Please define the MONGODB_URI environment variable.');
    process.exit(1);
  }

  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected successfully.');

    console.log('Cleaning old data...');
    await Promise.all([
      Product.deleteMany({}),
      User.deleteMany({}),
      Category.deleteMany({}),
    ]);
    console.log('Old data cleaned.');

    console.log('Preparing seed data...');

    const categoriesToSeed = [
      { name: 'Electronics', description: 'Gadgets and devices' },
      { name: 'Books', description: 'Printed and digital books' },
      { name: 'Clothing', description: 'Apparel and accessories' },
    ];

    // Insert categories in chunks (small here but consistent)
    const insertedCategories = await insertInChunks(Category, categoriesToSeed, BATCH_SIZE, 'Category');
    const electronicsCat = insertedCategories.find((c: any) => c.name === 'Electronics')!;
    const clothingCat = insertedCategories.find((c: any) => c.name === 'Clothing')!;

    const usersToSeed = [
      { name: 'Alice Johnson', email: 'alice@example.com' },
      { name: 'Bob Williams', email: 'bob@example.com' },
    ];

    const insertedUsers = await insertInChunks(User, usersToSeed, BATCH_SIZE, 'User');
    const alice = insertedUsers.find((u: any) => u.name === 'Alice Johnson')!;
    const bob = insertedUsers.find((u: any) => u.name === 'Bob Williams')!;

    // Build products array using the inserted category/user ids
    const productsToSeed = [
      {
        name: 'Echo Dot (5th Gen) | Smart speaker with Alexa',
        description: 'Our most popular smart speaker with Alexa, the Echo Dot features a sleek design and improved audio for vibrant sound anywhere in your home.',
        brand: 'Amazon',
        category: electronicsCat._id,
        basePrice: 49.99,
        status: 'ACTIVE',
        thumbnail: 'https://m.media-amazon.com/images/I/71+ten3B+iL._AC_UY218_.jpg',
        images: [
          'https://m.media-amazon.com/images/I/71LpAY-33OL._AC_UY218_.jpg',
          'https://m.media-amazon.com/images/I/71C-Yxk-pJL._AC_UY218_.jpg',
        ],
        reviews: [
          { user: alice._id, name: alice.name, rating: 5, comment: 'Absolutely love it! The sound quality is amazing for its size.' },
          { user: bob._id, name: bob.name, rating: 4, comment: 'Great device, very helpful. Sometimes mishears commands.' },
        ],
        rating: 4.5,
        reviewCount: 2,
        stock: 150,
        tags: ['smart speaker', 'alexa', 'amazon echo'],
        isFeatured: true,
        attributes: new Map([['Color', 'Charcoal'], ['Connectivity', 'Bluetooth, Wi-Fi']]),
      },
      {
        name: 'Kindle Paperwhite (16 GB)',
        description: 'Now with a 6.8" display and thinner borders, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns.',
        brand: 'Amazon',
        category: electronicsCat._id,
        basePrice: 139.99,
        status: 'ACTIVE',
        thumbnail: 'https://m.media-amazon.com/images/I/61C+2-2M2QL._AC_UY218_.jpg',
        images: [],
        rating: 4.8,
        reviewCount: 1,
        reviews: [
          { user: alice._id, name: alice.name, rating: 5, comment: 'The best e-reader on the market. The warm light is a game-changer.' },
        ],
        variants: [
          { sku: 'KPW-16-BLK', priceModifier: 0, stock: 75, attributes: [{ name: 'Color', value: 'Black' }, { name: 'Storage', value: '16GB' }] },
          { sku: 'KPW-32-BLK', priceModifier: 20, stock: 40, attributes: [{ name: 'Color', value: 'Black' }, { name: 'Storage', value: '32GB' }] },
        ],
        stock: 0,
        tags: ['ereader', 'kindle', 'books'],
      },
      {
        name: 'Classic Cotton T-Shirt',
        description: 'A comfortable and durable t-shirt made from 100% premium cotton.',
        brand: 'Generic Apparel',
        category: clothingCat._id,
        basePrice: 19.99,
        status: 'ACTIVE',
        thumbnail: 'https://m.media-amazon.com/images/I/61f1Yf62b-L._AC_UL320_.jpg',
        images: [],
        rating: 0,
        reviewCount: 0,
        reviews: [],
        variants: [
          { sku: 'TS-RED-S', priceModifier: 0, stock: 50, attributes: [{ name: 'Color', value: 'Red' }, { name: 'Size', value: 'S' }] },
          { sku: 'TS-RED-M', priceModifier: 0, stock: 50, attributes: [{ name: 'Color', value: 'Red' }, { name: 'Size', value: 'M' }] },
          { sku: 'TS-BLU-M', priceModifier: 0, stock: 45, attributes: [{ name: 'Color', value: 'Blue' }, { name: 'Size', value: 'M' }] },
          { sku: 'TS-BLU-L', priceModifier: 2.5, stock: 30, attributes: [{ name: 'Color', value: 'Blue' }, { name: 'Size', value: 'L' }] },
        ],
        stock: 0,
        tags: ['shirt', 'clothing', 'apparel', 'cotton'],
        attributes: new Map([['Material', '100% Cotton']]),
      },
    ];

    // Normalize maps to objects and insert products in chunks
    const normalizedProducts = productsToSeed.map(normalizeProductForInsert);
    await insertInChunks(Product, normalizedProducts, BATCH_SIZE, 'Product');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error during database operation:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed.');
  }
};

// Run the seeder
seedDatabase().catch(err => {
  console.error('Unhandled error in seeder:', err);
  process.exit(1);
});
