import {deminor} from './dom.js'

const bouton = document.querySelectorAll("input");
const direction = {left: 0, right: 3, forward: 1, shoot: 2, reset:4};

bouton.forEach(bout => {
    bout.addEventListener("click", e => {
        // console.log(e.target);
        // console.log(bouton[direction.left]);
        switch (e.target) {
            case bouton[direction.left]:
                deminor.actionleft();
                break;
            case bouton[direction.forward]:
                deminor.actionforward();
                break;
            case bouton[direction.shoot]:
                deminor.actionshoot();
                break;
            case bouton[direction.right]:
                deminor.actionright();
                break;
            case bouton[direction.reset]:
                deminor.actionreset();
                break;
            default:
                break;
        }
    });
});

document.addEventListener("keydown", e => {
    // console.log(e.key);
    // console.log('a');
    switch (e.key) {
        case 'a':
            deminor.actionleft();
            break;
        case 'w':
            deminor.actionforward();
            break;
        case 's':
            deminor.actionshoot();
            break;
        case 'd':
            deminor.actionright();
            break;
        case 'r':
            deminor.actionreset();
            break;
        default:
            break;
    }
    deminor.getendofgame();
});

deminor.randFill();
