/* eslint-disable lines-between-class-members */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-async-promise-executor */
import firebase from 'firebase';
import firebaseApp from './firebase';

class AuthService {
	emailRegister(User) {
		return new Promise(async (resolve, reject) => {
			const { email, password } = User;
			firebaseApp
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then((userCredential) => {
					const { user } = userCredential;
					const data = { ...User, uid: user.uid };
					resolve(data);
				})
				.catch((e) => {
					reject(new Error(e));
				});
		});
	}

	emailLogin(User) {
		return new Promise(async (resolve, reject) => {
			const { email, password } = User;
			firebaseApp
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then((userCredential) => {
					const { user } = userCredential;
					const ref = firebaseApp.database().ref(`userId/${user.uid}`);
					ref.on('value', (snapshot) => {
						const data = snapshot.val();
						resolve(data);
					});
				})
				.catch((e) => {
					reject(e);
				});
		});
	}

	checkNickname(nickname) {
		return new Promise(async (resolve, reject) => {
			const ref = await firebaseApp.database().ref(`nickname/${nickname}`);
			ref.on('value', (snapshot) => {
				const data = snapshot.val();
				data ?? resolve(nickname);
				reject(new Error('nickname is already exists'));
			});
		});
	}

	facebookLogin() {
		return new Promise(async (resolve, reject) => {
			const provider = new firebase.auth.FacebookAuthProvider();
			firebaseApp
				.auth()
				.signInWithPopup(provider)
				.then(async (data) => {
					const { displayName } = data.user.bc;
					const ref = await firebaseApp
						.database()
						.ref(`userId/${data.user.uid}`);
					ref.on('value', (snapshot) => {
						const value = snapshot.val();
						const dbData = {
							nickname: displayName,
							username: displayName,
						};
						value && resolve(dbData);
						firebaseApp.database().ref(`userId/${data.user.uid}`).set(dbData);
					});
				})
				.catch((e) => reject(e));
		});
	}
	logout() {
		firebase.auth().signOut();
	}
	onAuthChange(onUserChanged) {
		firebase.auth().onAuthStateChanged((user) => {
			onUserChanged(user);
		});
	}
}

const authService = new AuthService();

export default authService;
