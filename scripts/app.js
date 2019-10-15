// The app page is will be linking the UI and chat pages and calling the functions that are created there

// DOM QUERIES
chatList = document.querySelector('.chat-list');

newChat = document.querySelector('.new-chat');

newNameForm = document.querySelector('.new-name');

updateMssg = document.querySelector('.update-mssg');

// Getting hold of the parent element of the buttons in order to listen for a click event
chatRooms = document.querySelector('.chat-rooms');

// ADD A NEW CHAT
newChat.addEventListener('submit', e => {
    e.preventDefault();
    message = newChat.message.value.trim();
    chatroom.addChat(message);
});

// UPDATING NAME
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    newNameForm.reset();
    updateMssg.innerText = `Your username was updated to '${newName}'`
    setTimeout(() => updateMssg.innerText = ``, 3000);
})

// CHANGING ROOMS
chatRooms.addEventListener('click', e => {
// Checking if click was on button
    if (e.target.tagName === 'BUTTON') {
// Grabbing id of the button (the IDs correlate to the names of the chatrooms they represent)
        room = e.target.id
// Clearing the messages from the chat when the user changes room
        chatUI.clear();
// Passing the id of the button into the updataRoom method so that the 'room' property in the chatroom object is changed and the...
// event listener for new messages in the old room is disengaged
        chatroom.updateRoom(room);
// Activating an event listener on the new room; now the 'room' property has been updated, the listener is automatically placed on the...
// new room
        chatroom.getChats(data => {chatUI.render(data)});

    };
})

// SETTING USERNAME
username = localStorage.username ? localStorage.username : 'anon';


// CLASS INSTANCES
const chatroom = new Chatroom('female', username);
const chatUI = new ChatUI(chatList);

// GET CHATS AND RENDER
chatroom.getChats(data => {chatUI.render(data)});



