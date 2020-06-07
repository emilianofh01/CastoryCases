import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


//const admin = require('firebase-admin');
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
//
const app : admin.app.App = admin.initializeApp();
const db : admin.firestore.Firestore = admin.firestore(app);
const sharp = require('sharp');

export const getProduct = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', '*');
  const query = request.params[0].replace('/', '').replace('\\', '');
  if(query == "")
    response.send(undefined)
  let productRef : admin.firestore.DocumentReference = db.collection('products').doc(query);
  productRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else{
        let object = doc.data() ?? {};
        if(object != {}) object.id = doc.id;
        response.send(object)
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
      response.send(undefined)
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
  }).catch(e=>{console.log(e); response.send(undefined)})

})

function resize(imgBase64: string, width: number) : Promise<string>{
  let parts = imgBase64.split(';');
  let mimType = parts[0].split(':')[1];
  let imageData = parts[1].split(',')[1];
  var img:Buffer = new Buffer(imageData, 'base64');
  
  return new Promise(
    (resolve, reject)=>{
      sharp(img)
            .resize({ width: width })
            .toBuffer()
            .then((resizedImageBuffer:any )=> {
                let resizedImageData = resizedImageBuffer.toString('base64');
                let resizedBase64 = `data:${mimType};base64,${resizedImageData}`;

                resolve(resizedBase64);
            })
    }
  )
}

export const quicksearch = functions.https.onRequest((request, response)=>{
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
          let promises: Promise<void>[] = []
          snapshot.docs.forEach((
            (doc) =>{
              let data = doc.data();
              
              if(removeAccents(data.productName).toLowerCase().includes(lowerCasedFilter)){
                let resObj = {id: doc.id, productBrand: data.productBrand, productImages: [""], productModel: data.productModel, productName: data.productName, productPrice: data.productPrice}
                promises.push(
                  resize(data.productImages[0], 480).then(
                    (img)=>{
                      resObj.productImages[0] = img
                      DatosFiltrados.push(resObj)
                    }
                  ).catch((e)=>{console.log(e); response.send(undefined);})
                )
                
              }
            }
          ))
          Promise.all(promises).then(
            (e)=>resolve()
          ).catch(e=>{console.log(e); response.send(undefined)});
        }
      ).then(
        () => response.send(DatosFiltrados)
      ).catch(e=>{console.log(e); response.send(undefined)});
    }
  ).catch(e=>{console.log(e); response.send(undefined)})

})

export const searchfilter = functions.https.onRequest((request, response)=>{
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', '*');
  if(request.params[0].replace("/", "").replace("\\", "") == "")
    response.send(undefined)
  const busqueda = JSON.parse(request.params[0].replace("/", "").replace("\\", ""));
  
  const removeAccents = (str : string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const lowerCasedFilter = busqueda.productSearch == undefined ? ("") : removeAccents(busqueda.productSearch.toLowerCase());

  let filters: any[] = Object.keys(busqueda);
  let DatosFiltrados : any[] = []
  db.collection('products').get().then(
    (snapshot)=>{
      new Promise(
        (resolve, reject)=>{
          let promises: Promise<void>[] = []
          snapshot.docs.forEach((
            (doc) =>{
              let data = doc.data();
              if(filter(data, filters, busqueda) && (!busqueda.productSearch || removeAccents(data.productName).toLowerCase().includes(lowerCasedFilter)) && (!busqueda.priceRange || (busqueda.priceRange[0] <= data.productPrice && busqueda.priceRange[1] >= data.productPrice))){
                let resObj = data;
                resObj.id = doc.id;
                promises.push(
                  resize(data.productImages[0], 480).then(
                    (img)=>{
                      resObj.productImages[0] = img
                      DatosFiltrados.push(resObj)
                    }
                  ).catch((e)=>{console.log(e); response.send(undefined);})
                )
                
              }
            }
          ))
          Promise.all(promises).then(
            (e)=>resolve()
          ).catch(e=>{console.log(e); response.send(undefined)});
        }
      ).then(
        () => response.send(DatosFiltrados)
      ).catch(e=>{console.log(e); response.send(undefined)});
    }
  ).catch(e=>{console.log(e); response.send(undefined)})

})

function filter(obj:any, filters:any[], busqueda:any){
  let m = true;
  filters.forEach(element => {
    if(m && element != "priceRange" && element != "productSearch" && obj[element] != busqueda[element]){
      m = false;
    }
  });
  return m;
}

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
      ).catch(e=>{console.log(e); response.send(undefined)});
    }
  ).catch(e=>{console.log(e); response.send(undefined)})

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
      ).catch(e=>{console.log(e); response.send(undefined)});
    }
  ).catch(e=>{console.log(e); response.send(undefined)})

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