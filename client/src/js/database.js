import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  
  console.log('💻 database implementation in progress');

  // create a connection to db
  const jateDb = await openDB('jate', 1);
  // create a transaction to write to db
  const transaction = jateDb.transaction('jate', 'readwrite')
  // open the db object store
  const store = transaction.objectStore('jate');
  // associate data in the object store
  const request = store.put({ id: 1, jate: content })
  // wait for saved data
  const result = await request;
  console.log('⭐ yay! your data has saved to the database!! ⭐')
}; 



// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
console.log('👁️‍🗨️ Get all from the database in progress')

// create a new connection to the db
const jateDb = await openDB('jate', 1);
// create a new transaction to read from db
const transaction = jateDb.transaction('jate', 'readonly'); 
// open the database object
const store = transaction.objectStore('jate');
// get the data from the object
const request = store.getAll();
// wait for the data to be returned
const result = await request;
console.log('🛸 Data Retrieved', result);
// return the data
return result;
};

initdb();
