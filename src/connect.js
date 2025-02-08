//import { getMaxListeners } from "events";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";


import app from "./firebase-config.js"
import pkg from 'firebase-admin';
//import { config } from "process";
const { admin } = pkg;

var url = 'http://localhost:5000/api'


const auth = getAuth(app);
//const provider = new GoogleAuthProvider();



async function verify_game(gid, token){
    try {
        const response = await fetch(url + '/games/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({gid,token})
        });

        const data = await response.json();
        console.log("Verified game response: ");
        console.log(data);

    } catch (error){
        console.error('Error creating new player:', error);
    }
}

async function new_player(username, token){
    try {

        console.log(JSON.stringify({token,username}));
        const response = await fetch(url + '/players/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token,username})
        });

        const data = await response.json();
        console.log("New player");
        console.log(data);

    } catch (error){
        console.error('Error creating new player:', error);
    }
}


async function new_user(username, email, pwd){
    try {
        const result = await createUserWithEmailAndPassword(auth, email, pwd);
        const token = await result.user.getIdToken();


        const response = await fetch(url + '/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token, email})
        });


        const data = await response.json();
        console.log("New user: ");
        console.log(data);
        new_player(username, token);
    } catch (error){
        console.error('Error creating new user:', error);
    }

}

async function login(email, pwd){
    try {
        const result = await signInWithEmailAndPassword(auth, email, pwd);
        auth.currentUser = result;

        
        const token = await result.user.getIdToken(); 

        const response = await fetch(url + '/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, token})
        });

        const data = await response.json();
        //console.log('Backend Response:', data);
    } catch (error) {
        console.error('Error during login:', error);
    }
}



async function get_game_by_uid(uid) {
    try {
        let response = await fetch(url + '/games/get/' + uid);
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching games:', error);
    }
}


async function get_games() {

    console.log(auth.currentUser.user.reloadUserInfo.email);

    try {
        let response = await fetch(url + '/games/get');
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching games:', error);
    }
}

async function get_player_games(uid) {
    try {
        let response = await fetch(url + '/games/get/' +uid );
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching player games:', error);
    }
}

async function add_game(players, winner) {
    const token = await auth.currentUser.user.getIdToken();
    //console.log(JSON.stringify({ players, winner, token }));
    try {
        let response = await fetch(url + '/games/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ players, winner, token })
        });
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error adding game:', error);
    }
}



async function get_player(uid) {
    try {
        let response = await fetch(url + '/players/get/' + uid);
        console.log(await response);
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching player:', error);
    }
}


//login("linda.bergstig@gmail.com", "password").then(() =>{ 
//new_user("Pdiddy","linda.bergstig@gmail.com", "password")//});
login("linda.bergstig@gmail.com", "password").then(() => {add_game(['Pdiddy', 'Dootz'], 'Pdiddy')})
await new Promise(r => setTimeout(r, 1000));

add_game(['Pdiddy', 'Dootz'], 'Pdiddy')
add_game(['Pdiddy', 'Dootz'], 'Dootz')
add_game(['Pdiddy', 'Theo'], 'Pdiddy')
add_game(['Pdiddy', 'Oscar'], 'Oscar')
//await new Promise(r => setTimeout(r, 1000));
//onsole.log(auth.currentUser.user.uid)
//const token = await auth.currentUser.user.getIdToken();
//get_player(auth.currentUser.user.uid)