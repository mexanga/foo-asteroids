const FPS = 60;
const RATIO_RND_NUMBER = 3;

function init() {
    // On initialise le canevas
    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    window.requestAnimationFrame(callback => render(context, width, height, 0, 0, 0,  callback));
}


function render(context, width, height, _intervalEntity, _intervalFps, _frames, callback) {
    const timeStart = performance.now();

    // On dessine les nouvelles formes par dessus les anciennes
    context.globalCompositeOperation = 'destination-over';
    // On nettoie le rendu
    context.clearRect(0, 0, width, height);

    // On définit les couleurs principaux du jeu : noir pour le fond, blanc pour les contours.
    context.fillStyle = 'rgb(0,0,0);';
    context.strokeStyle = 'rgb(255,255,255);';
    context.save();

    // On se déplace au centre du canevas
    const x = roundNumber(width / 2);
    const y = roundNumber(height / 2);
    context.translate(x, y);
    delete x;
    delete y;

    // Début du rendu
    const _tempEntity = 1/FPS;
    if (_intervalEntity >= _tempEntity) {
        drawEntities(context, []);
        _intervalEntity = 0;
        _frames += 1;
    }
    const _tempFps = 1;
    if (_intervalFps >= _tempFps) {
        window.requestAnimationFrame(callback => render(context, _frames, callback));
        _intervalFps = 0;
        _frames = 0;
    }
    // Fin du rendu

    context.restore();

    const timeEnd = performance.now();

    const diffTime = timeEnd - timeStart;

    _intervalFps += diffTime;
    _intervalEntity += diffTime;

    // console.log(_intervalFps, _intervalEntity);

    window.requestAnimationFrame(callback => render(context, width, height, _intervalEntity, _intervalFps, _frames,  callback));
}


function drawFps(context, fps = 0, callback) {
    console.log('FPS : ' + fps);
    context.fillStyle = "white";
    context.font = "normal 32px Arial";
    context.fillText = (fps, 200, 200);
    context.save();
}

function drawEntities(context, entities = []) {
    
}

function _roundNumber (number) {
    return parseFloat(parseFloat(number).toFixed(RATIO_RND_NUMBER));
}