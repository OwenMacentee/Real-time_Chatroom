// adding new chat documents
// setting up a real-time listener to get new chats
// updating the username
// updating the room

class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
    }
    async addChat (message) {
        // Formatting chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }
         // Saving chat
        const response = await this.chats.add(chat);
        return response;
    }
    // A simple method to update a username
    updateName(username){
        this.username = username;
        localStorage.setItem('username', username);
        console.log('username updated');
    }
    updateRoom(room){
        this.room = room;
        if (this.unsub){
            this.unsub();
        }
    }

    getChats(callback){
        this.unsub = this.chats
            .where('room', '==', this.room)
                .orderBy('created_at')
                // Real-time listener
                    .onSnapshot(snapshot => {
                        snapshot.docChanges().forEach(change => {
                            if (change.type === 'added'){
                                callback(change.doc.data());
                            };
                        });
                    });
    }
};


// chatroom.addChat('Yo sisters!')
// .then(() => console.log('chat added'))
// .catch(err => console.log(err));

// chatroom.getChats(data => {
//     console.log(data);
// });
