

function btn_publish() {
    const pub = document.querySelector('#publicacao');
    pub.innerHTML += `
                    <div id="newPub" class="d-flex justify-content-center">
                        <div class="row m-4 col-8" >
                            <div class="col card d-flex justify-content-center" >
                                <img src="" class="align-self-center" alt="Imagem carregada" id="preview-image" style="display: none; max-width:500px;max-height:500px;">
                            </div>

                            <div class="col card">
                                <div class="d-flex justify-content-end">
                                    <button type="button" class="btn-close" aria-label="Close" onclick="close_publish()"></button>
                                </div>
                                <form action="/perfil/savePubImg" method="post" enctype="multipart/form-data">
                                    <input id="load-image" class="form-control mt-4" type="file" name="file"><br>

                                    <div class="input-group mt-4">
                                        <textarea class="form-control " style="min-width:100px;min-height:200px;" aria-label="Com textarea" name="text_review" placeholder="Escreva sua resenha ou publicação aqui!"></textarea>
                                    </div>
                                    <input type="text" class="form-control mt-4" placeholder="Selecione um jogo?" name="gamename_review"
                                        aria-describedby="inputGroup-sizing-default">
                                    <div class="d-flex justify-content-end">
                                        <input type="submit" id="btn_singup" class="col-5 my-4 btn-login">
                                    </div>         
                                </form>
                            </div>
                        </div>
                    </div>
                    `

    const input = document.querySelector('#load-image');
    input.addEventListener('change', function (e) {
        const tgt = e.target;

        const files = tgt.files;
        const fr = new FileReader();

        fr.onload = function () {
            let previewImage = document.querySelector('#preview-image');
            previewImage.src = fr.result;
            previewImage.style.display = 'block';
        }

        fr.readAsDataURL(files[0]);
    });
}


function close_publish() {
    const pub = document.querySelector('#publicacao');
    const closePub = document.querySelector('#newPub');
    pub.removeChild(closePub);

}