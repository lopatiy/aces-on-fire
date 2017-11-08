import Plane from './plane';

const props = {
    width: 0,
    height: 0,

    scene: []
};

function init() {
    const canvas = document.getElementById('sky'),
        dim = document.body.getBoundingClientRect();

    props.context = canvas.getContext('2d');
    props.context.globalCompositeOperation = 'source-over';

    canvas.width = props.width = dim.width;
    canvas.height = props.height = dim.height;

    props.scene.push(new Plane(props.width / 2, props.height / 2, props));

    animate();
}

function animate() {
    requestAnimationFrame(() => {
        draw();
        animate();
    });
}

function draw() {
    props.context.clearRect(0, 0, props.width, props.height);

    for (let i = 0; i < props.scene.length; i++) {
        props.scene[i] && props.scene[i].draw && props.scene[i].draw();
    }
}

init();