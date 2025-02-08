//import { getMaxListeners } from "events";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";


import app from "./firebase-config.js"
import pkg from 'firebase-admin';
//import { config } from "process";
const { admin } = pkg;

var url = 'http://localhost:5000/api'


const auth = getAuth(app);
//const provider = new GoogleAuthProvider();



async function new_player(username){
    try {
        const token = await auth.currentUser.getIdToken();

        const response = await fetch(url + '/players/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token,username})
        });

        const data = await response.json();

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
        console.log("New player: ");
        console.log(data)
        new_player(username)
    } catch (error){
        console.error('Error creating new user:', error);
    }

}

async function login(email, pwd){
    try {
        const result = await signInWithEmailAndPassword(auth, email, pwd);
        const token = await result.user.getIdToken(); 

        const response = await fetch(url + '/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, token})
        });

        const data = await response.json();
        console.log('Backend Response:', data);
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


async function get_game() {
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

async function add_game(players, winner, token) {
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
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching player:', error);
    }
}



new_user("Pdiddy","linda.bergstig@gmail.com", "password");
login("linda.bergstig@gmail.com", "password")
//add_game(())
//get_game("") 