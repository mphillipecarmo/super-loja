//let id_btn_login = document.querySelector('#id_btn-sing-in');
function id_btn_login() {

    let pop_up = document.querySelector('#pop-up-login');

    if (!pop_up) {
        let id_index = document.querySelector('#index-body');
        id_index.innerHTML += `
                    <div id="pop-up-login" >
                        <div class="d-flex justify-content-center class="d-flex col-7">
                            <div class="row login-card-transition">
                                <div class="p-3 col-6 bg-pattern d-flex flex-column justify-content-center align-items-center  ">
                                    <div class="p-lg-5 m-5 col-6">
                                        <img class="spiel-logo" src="images/spielshiffLogo.svg" alt="Logomarca da Spielshiff">
                                        <h1 class="pt-3 font-weight-bold">SpielShiff</h1>
                                        <div class="px-5 text-white fs-6 d-flex justify-content-end">Sua biblioteca de jogos!</div>
                                    </div>
                                </div>
    
                                <div id="singin-card" class="col-6 d-flex justify-content-center p-5 login-card-animation">
                                    <div id="div-login">
                                        <div class="d-flex justify-content-end">
                                            <button id="login-btn-close" type="button" class="btn-close" aria-label="Close" onclick="login_btn_close()"></button>
                                        </div>
                                        
                                        <h3 class="mt-5 p-3 text-center">Fazer Login!</h3>
                                        <form id="form-login" action="/auth/authenticate" method="POST">
    
                                            <div class=" label-float">
                                                <input type="email" class="form-control " id="user_login" name="user_login" placeholder="">
                                                <label for="user_login">E-mail</label>
                                            </div>
    
                                            <div class="label-float">
                                                <input type="password" class="form-control" id="passwd_login" name="passwd_login"
                                                    placeholder="">
                                                <label for="password">Senha</label>
                                            </div>
                                            <div class="d-flex justify-content-center ">
                                                <button type="submit" id="btn_login" class="col-5 mt-4 btn-login">Entrar</button>
                                            </div>
                                        </form>
    
                                        <hr>
    
                                        <div class="d-flex justify-content-around">
                                            <p class="">Não tem conta?</p>
                                            <a id="singup" onclick='btn_singup()'>Cadastre-se</a>
                                        </div>
                                    </div>
    
                                    <div id="div-register">
                                        <div class="d-flex justify-content-end">
                                            <button id="login-btn-close" type="button" class="btn-close" aria-label="Close" onclick="login_btn_close()"></button>
                                        </div>
                                
                                        <h3 class="mt-2 p-3 text-center">Crie uma conta</h3>
                                        <form id="form-singup" action="/auth/register" method="POST">
    
                                            <div class=" label-float">
                                                <input type="text" class="form-control " id="reg_user_name" name="reg_user_name"
                                                    placeholder="">
                                                <label for="user_login">Nome</label>
                                            </div>
                                            <div class=" label-float">
                                                <input type="text" class="form-control " id="reg_user_email" name="reg_user_email"
                                                    placeholder="">
                                                <label for="user_login">E-mail</label>
                                            </div>
                                            <div class=" label-float">
                                                <input type="text" class="form-control " id="reg_user_uname" name="reg_user_uname"
                                                    placeholder="">
                                                <label for="reg_user_uname">Usuário</label>
                                            </div>
                                            <div class="label-float">
                                                <input type="password" class="form-control" id="reg_passwd_login" name="reg_passwd_login"
                                                    placeholder="">
                                                <label for="password">Senha</label>
                                            </div>
                                            <div class="label-float">
                                                <input type="password" class="form-control" id="reg_passwd_conf" name="reg_passwd_conf"
                                                    placeholder="">
                                                <label for="password">Confime sua senha</label>
                                            </div>
                                            <div class="d-flex justify-content-center ">
                                                <button type="submit" id="btn_singup" class="col-5 mt-4 btn-login">Cadastrar</button>
                                            </div>
    
                                        </form>
                                        
                                        <hr>
    
                                        <div class="d-flex justify-content-around">
                                            <p class="">Já possui conta?</p>
                                            <a id="singin" onclick='btn_singin()'>Faça Login</a>
                                        </div>
                                    </div>
                                    <br><br>
                                </div>
                            </div>
                        </div>
                    </div>
                `
    } else {
        login_btn_close();
    }


}

function btn_singup() {
    let singin_form = document.querySelector('#div-login');
    singin_form.style.display = "none";

    let singup_form = document.querySelector('#div-register');
    singup_form.style.display = "block";

};

function btn_singin() {
    let singup_form = document.querySelector('#div-register');
    singup_form.style.display = "none";

    let singin_form = document.querySelector('#div-login');
    singin_form.style.display = "block";

};

function login_btn_close() {
    let btn_close = document.querySelector('#pop-up-login');
    let div_body = document.querySelector('#index-body');
    div_body.removeChild(btn_close);


}