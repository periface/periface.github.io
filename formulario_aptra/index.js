let loading = false; // NI SE USA 🤡
let contextoModal = 0; // NO QUERIA REPETIR CODIGO, PERO NO SE ME OCURRIO OTRA FORMA DE HACERLO EJEMPLO: 0 = ejemploFotoModal, 1 = subirFotoModal

const ejemploFotoBTN = document.querySelector('#ejemploFotoBtn');
const startOverBTN = document.querySelector('#startOver');
const siBTN = document.querySelector('#si');
const noBTN = document.querySelector('#no');

const ejemploFotoIMG = document.querySelector('#ejemploFotoImg');
const successIMG = document.querySelector('#successimg');

const exampleFotoModal = new bootstrap.Modal(document.querySelector('#exampleFoto'));
const previousFotoModal = new bootstrap.Modal(document.querySelector('#previousFoto'));
const subirFotoModal = new bootstrap.Modal(document.querySelector('#subirFoto'));

const successImgContainerDIV = document.querySelector('#successImgContainer');
const successImgResultDIV = document.querySelector('#successImgResult');
const fotoMainDIV = document.querySelector('#fotoMain');
const fotoMainFinishedDIV = document.querySelector('#fotoMainFinished');
const subirFotoContainerDIV = document.querySelector('#subirFotoContainer');
const subirFotoContainerLoadingDIV = document.querySelector('#subirFotoContainerLoading');

const successGifRoute = './img/success.gif';
const upFotoINPUT = document.querySelector('#up-foto');



siBTN.addEventListener('click', () => {
    if (contextoModal === 0) {
        exampleFotoModal.hide();
        fotoMainDIV.classList.add('d-none');
        fotoMainFinishedDIV.style.display = 'block';
        previousFotoModal.hide();
    }
    else {
        previousFotoModal.hide();
        fotoMainDIV.classList.add('d-none');
        fotoMainFinishedDIV.style.display = 'block';
    }
});

noBTN.addEventListener('click', () => {
    if (contextoModal === 0) {
        exampleFotoModal.hide();
        previousFotoModal.show();
    }
    else {
        previousFotoModal.hide();
        subirFotoModal.show();
    }
});

startOverBTN.addEventListener('click', () => {
    fotoMainDIV.classList.remove('d-none');
    fotoMainFinishedDIV.style.display = 'none';
});

async function onFileChange(evt) {
    try {
        await uploadFotoProcess();
    } catch (error) {
        console.log(error);
        resetWhenError();
    }
}

ejemploFotoBTN.addEventListener('click', async () => {
    try {
        await takeFotoProcess();
    }
    catch (error) {
        console.log(error);
        resetWhenError();
    }

});
$(document).ready(function () {
    $('.select2me').select2({
        theme: "bootstrap-5",
        width: '100%',
    });
});

function resetWhenError() {
    // generado por IA 🤡 no creo que jale, pero por si las dudas
    ejemploFotoIMG.src = './ejemplo.png';
    ejemploFotoBTN.disabled = false;
    subirFotoContainerDIV.style.display = 'block';
    subirFotoContainerLoadingDIV.style.display = 'none';
    upFotoINPUT.value = '';
    successImgContainerDIV.style.display = 'block';
    successImgResultDIV.style.display = 'none';
    fotoMainDIV.classList.remove('d-none');
    fotoMainFinishedDIV.style.display = 'none';
    exampleFotoModal.hide();
    previousFotoModal.hide();
    subirFotoModal.hide();
}

function fakeAsync() {
    loading = true;
    return new Promise((resolve) => {
        setTimeout(() => {
            loading = false;
            resolve();
        }, 3000);
    });
}

async function takeFotoProcess() {
    contextoModal = 0;
    ejemploFotoIMG.src = './img/loading.gif';
    // disable button
    ejemploFotoBTN.disabled = true;
    await fakeAsync();
    ejemploFotoIMG.src = './ejemplo.png';
    // enable button
    ejemploFotoBTN.disabled = false;
    exampleFotoModal.hide();
    successIMG.src = successGifRoute;
    previousFotoModal.show();

    setTimeout(() => {
        successImgContainerDIV.style.display = 'none';
        successImgResultDIV.style.display = 'block';
    }, 5000);
}

async function uploadFotoProcess() {
    contextoModal = 1;
    subirFotoContainerDIV.style.display = 'none';
    subirFotoContainerLoadingDIV.style.display = 'block';
    await fakeAsync();
    subirFotoContainerDIV.style.display = 'block';
    subirFotoContainerLoadingDIV.style.display = 'none';
    upFotoINPUT.value = '';
    subirFotoModal.hide();
    previousFotoModal.show();
    successIMG.src = successGifRoute;
    setTimeout(() => {
        successImgContainerDIV.style.display = 'none';
        successImgResultDIV.style.display = 'block';
    }, 5000);
}



// async function accessCamera() {
//     try {
//         const constraints = {
//             video: true,
//         };
//         const stream = await navigator.mediaDevices.getUserMedia(constraints);
//         const video = document.querySelector('video');
//         video.srcObject = stream;
//         video.onloadedmetadata = () => {
//             video.play();
//             ejemploFotoIMG.src = './img/loading.gif';

//         };
//     } catch (error) {
//         console.log(error);
//     }
// }

// accessCamera();