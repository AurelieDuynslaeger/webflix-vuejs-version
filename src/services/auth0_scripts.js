// import { MongoClient } from 'mongodb';
// import bcrypt from 'bcryptjs';
// import dotenv from 'dotenv';

// // Chargez les variables d'environnement
// dotenv.config();

// const dbName = 'webflix';
// const collectionName = 'users';
// const uri = import.meta.process.env.VITE_MONGODB_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// // Classe d'erreur personnalisée
// class WrongUsernameOrPasswordError extends Error {
//     constructor(message) {
//         super(message);
//         this.name = "WrongUsernameOrPasswordError";
//     }
// }

// // Fonction pour vérifier le mot de passe
// function verifyPassword(plainPassword, hashedPassword) {
//     return bcrypt.compareSync(plainPassword, hashedPassword);
// }

// // Fonction de connexion
// export function login(email, password, callback) {
//     client.connect(err => {
//         if (err) return callback(err);

//         const collection = client.db(dbName).collection(collectionName);
//         collection.findOne({ email: email }, (err, user) => {
//             if (err) return callback(err);
//             if (!user) return callback(new WrongUsernameOrPasswordError('User not found'));

//             // Vérifiez le mot de passe
//             const isPasswordValid = verifyPassword(password, user.password);
//             if (!isPasswordValid) return callback(new WrongUsernameOrPasswordError('Incorrect password'));

//             // Si tout va bien, retournez l'utilisateur
//             return callback(null, user);
//         });
//     });
// }

// // Fonction pour récupérer un utilisateur par email
// export function getByEmail(email, callback) {
//     client.connect(err => {
//         if (err) return callback(err);

//         const collection = client.db(dbName).collection(collectionName);
//         collection.findOne({ email: email }, (err, user) => {
//             if (err) return callback(err);
//             if (!user) return callback(null, null);
//             return callback(null, user);
//         });
//     });
// }
