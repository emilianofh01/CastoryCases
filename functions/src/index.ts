import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

//const admin = require('firebase-admin');
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const app : admin.app.App = admin.initializeApp();
const db : admin.firestore.Firestore = admin.firestore(app);

export const getProduct = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', '*');
  let productRef : admin.firestore.DocumentReference = db.collection('products').doc('HXBF4Hi0kZd1UqqDfs4a');
  productRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else{
        console.log(`${doc.data()}`)
        let jsonString : string = `${doc.data()}`
        let object = JSON.parse(jsonString)
        object.id = doc.id;
        response.send(object)
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
});

export const addProduct = functions.https.onRequest((request, response)=>{
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', '*');
  const query = request.params[0].replace('/', '').replace('\\', '');
  const obj = JSON.parse(query)
  db.collection('products').add(obj).then(()=>{
    response.send("")
  }).catch(e=>{console.log(e); response.send("Error :" + e)})

})

export const search = functions.https.onRequest((request, response)=>{
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', '*');
  const busqueda = request.params[0].replace('/', '').replace('\\', '');
  const removeAccents = (str : string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const lowerCasedFilter = removeAccents(busqueda.toLowerCase());
  let DatosFiltrados : any[] = []
  db.collection('products').get().then(
    (snapshot)=>{
      new Promise(
        (resolve, reject)=>{
          snapshot.docs.forEach((
            (doc) =>{
              let data = doc.data();
              data.id = doc.id;
              if(removeAccents(data.productName).toLowerCase().includes(lowerCasedFilter))
                DatosFiltrados.push(data);
            }
          ))
          resolve();
        }
      ).then(
        () => response.send(DatosFiltrados)
      ).catch(e=>{console.log(e); response.send("Error :" + e)});
    }
  ).catch(e=>{console.log(e); response.send("Error :" + e)})

})

export const searchtest = functions.https.onRequest((request, response)=>{
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', '*');
  const busqueda = request.params[0].replace('/', '').replace('\\', '');
  const removeAccents = (str : string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const lowerCasedFilter = removeAccents(busqueda.toLowerCase());
  let DatosFiltrados : any[] = []
  db.collection('products').get().then(
    (snapshot)=>{
      new Promise(
        (resolve, reject)=>{
          snapshot.docs.forEach((
            (doc) =>{
              let data = doc.data();
              data.id = doc.id;
              if(removeAccents(data.productName).toLowerCase().includes(lowerCasedFilter))
                DatosFiltrados.push(data);
            }
          ))
          resolve();
        }
      ).then(
        () => response.send(DatosFiltrados)
      ).catch(e=>{console.log(e); response.send("Error :" + e)});
    }
  ).catch(e=>{console.log(e); response.send("Error :" + e)})

})

export const test = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', '*');
  let productRef : admin.firestore.DocumentReference = db.collection('products').doc('HXBF4Hi0kZd1UqqDfs4a');
  productRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        response.send(doc.data())
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
});