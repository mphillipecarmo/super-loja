// function id_btn_gamelist() {
//     let pop_up = document.querySelector('#pop-up-gamelist');
//     if(!pop_up){
//         let id_index = document.querySelector('#library-body');
//         id_index.innerHTML += `
//             <div id="pop-up-gamelist" >
                
//                 <form action="/auth/create-gamelist" method="POST">
//                     <label for="reg_userlist_name">Nome da lista:
//                         <input type="text" id="gamelist-input-name" name="reg_userlist_name">
//                     </label>
//                     <input type="submit" value="Submit">
//                 </form> 
//             </div>

//         `
//     } 
// }

// function btn_create_gamelist() {
//     let gamelist_name = document.querySelector('#gamelist-input-name').value;
//     console.log(val);
// };

function id_btn_gamelist() {
    let pop_up = document.querySelector('#sidebar');
    if(pop_up){
        let id_index = document.querySelector('#library-body');
        pop_up.innerHTML += `
            <div id="pop-up-gamelist" >
                
                <form action="/library/create-gamelist" method="POST">
                    <label for="reg_userlist_name">Nome da lista:
                        <input type="text" id="gamelist-input-name" name="reg_userlist_name">
                    </label>
                    <button id="gamelist-create-btn" "type="submit"> Criar Lista</button>
                </form> 
            </div>

        `
    } 
}

function btn_create_gamelist() {
    let gamelist_name = document.querySelector('#gamelist-input-name').value;
    console.log(val);
};