class ChatUI {
    constructor(list){
        this.list = list;
    }

    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            { addSuffix: true }
        );
        const html = `
        <li>
            <span class="username">${data.username}</span>
            <span class="message">${data.message}</span>
            <div class="created_at">${when}</div>
        </li>
        `;
        this.list.innerHTML += html;
    }

    clear(){
        chatList.innerHTML = '';
    }
};