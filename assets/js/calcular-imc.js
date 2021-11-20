let $download = document.getElementById('download');
let $back = document.getElementById('back');

function CalcIMC() {
    peso = document.getElementById('peso');
    altura = document.getElementById('altura');
    peso = parseFloat(peso.value);
    altura = parseFloat(altura.value);
    if (isNaN(peso) || isNaN(altura)) {
        errorReport('Apenas números!');
        throw Error('A função deve receber apenas números');
    }
    if (peso < 0 || altura < 0) {
        errorReport('Apenas números positivos!');
        throw Error('A função deve receber apenas números positivos');
    }
    if (altura > 2.72) {
        errorReport('Você não é tão alto assim!');
        throw Error('Você não é tão alto assim!');
    }
    if (peso > 452) {
        errorReport('Você não é tão gordo assim!');
        throw Error('Você não é tão gordo assim!');
    }
    let IMC = peso / (altura * altura);
    IMC = IMC.toFixed(2);
    innerResult(IMC, classIMC(IMC));
    let timehtml2canvas = setTimeout(() => {
        $back.classList.remove('show');
        html2canvas(document.querySelector("html")).then(canvas => {
            $download.href = canvas.toDataURL("image/png");
            $download.download =  'seu imc';
            $download.classList.add('show');
            $back.classList.add('show');
        });
    }, 1500);
}
function classIMC(IMC) {
    if (IMC == undefined) {
        throw Error('A função deve receber o IMC');
    }
    IMC = parseFloat(IMC);
    if (isNaN(IMC)) {
        throw Error('o IMC deve ser um número');
    }
    if (IMC <= 16.9) {
        return 'Muito abaixo do peso. 😖';
    } else if (IMC <= 18.4) {
        return 'Abaixo do peso. 😖';
    } else if (IMC <= 24.9) {
        return 'Peso normal. 😊';
    } else if (IMC <= 29.9) {
        return 'Acima do peso. 😖';
    } else if (IMC <= 34.9) {
        return 'Obeso grau I. 😖';
    } else if (IMC <= 40) {
        return 'Obeso grau II. 😖';
    } else if (IMC > 40) {
        return 'Obeso grau III. 😖';
    } else {
        errorReport('Erro ao classificar');
        throw Error('Erro ao calcular');
    }
}
function errorReport(error) {
    $errors = document.getElementById('errors');
    $errors.innerHTML = error;
    $errors.classList.add('show');
    let sumir = setTimeout(() => {
        $errors.innerHTML = "";
        $errors.classList.remove('show');
    }, 1500)
}
function innerResult(imc, classifica) {
    let calc = document.querySelector('.calc');
    let result = document.querySelector('.result');
    let imcCamp = document.getElementById('imc-camp');
    let classCamp = document.getElementById('class-camp');
    imcCamp.innerHTML = imc;
    if(classifica) {
        classCamp.innerHTML = classifica;
    }
    let aguardar = setTimeout(() => {
        calc.classList.toggle('hidden');
        result.classList.toggle('hidden');
        back(true);
    }, 1000);
}
function back(bool) {
    let calc = document.querySelector('.calc');
    let result = document.querySelector('.result');
    let peso = document.getElementById('peso');
    let altura = document.getElementById('altura');
    if (bool) {
        $back.classList.add('show');
    } else {
        $back.classList.remove('show');
        $download.classList.remove('show');
        calc.classList.toggle('hidden');
        result.classList.toggle('hidden');
        peso.value = '';
        altura.value = '';
    }
}