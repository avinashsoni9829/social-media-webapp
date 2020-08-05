const functions = require('firebase-functions');
// we will import admin SDK in order to connect to firebase database
const admin=require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
    exports.helloWorld = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.send("Hello world!");
 });

 // api endpoint: https://us-central1-socialape-be5e3.cloudfunctions.net/helloWorld
 exports.getScreams = functions.https.onRequest((req,res)=> {
admin
    .firestore()
    .collection('screams')
    .get()
    .then(data =>{
    let screams=[];
    data.forEach((doc) =>{
        screams.push(doc.data());
    });
    // to return it as a json object
    return res.json(screams);
})
.catch(err =>console.error(err));
 });

 //api endpoint: https://us-central1-socialape-be5e3.cloudfunctions.net/getScreams

// function to create scream
 exports.createScream=functions.https.onRequest((req,res)=>{
  if(req.method!=='POST')
  {
      return res.status(400).json({error:'method not allowed !'});
  }
  const newScream = {
      body:req.body.body,
      userHandle: req.body.userHandle,
      createdAt: admin.firestore.Timestamp.fromDate(new Date())
  };

  admin.firestore()
       .collection('screams')
       .add(newScream)
       .then(doc=>{
           res.json({message:`document ${doc.id} created successfully!`});
       })
       .catch(err =>{
           res.status(500).json({error:' something went wrong!'});
           console.error(err);
       });
   });
   
    //api endpoint: https://us-central1-socialape-be5e3.cloudfunctions.net/createScream
