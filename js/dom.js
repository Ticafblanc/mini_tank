// premiere etape est de recuperer le tableau


export const deminor = function () {
    const map = document.querySelectorAll("td.td");
    const score = document.querySelector('#result');
    const fuel = document.querySelector("#level");
    let td = document.querySelectorAll("tr")
    const aimI =  {left: 0, right: 1, up: 2,down: 3};
    let position;
    let path = './img/tank_up.png';
    let level = 51
    let result = 0;
    let aim = aimI.up;
    let smallChar = new Image();//ADD STRUCT TO direction
    let tank = new Image();//ADD STRUCT TO direction
    tank.src = './img/fuel.png';
    tank.width = 35;
    tank.height = 35;
    // let smallChar = document.getElementById("tank").setAttribute("fill", "red")
    // let tab = [15, [15, null]];
    const colors = ['transparent', 'green', 'blue', 'red'];
    let putToGameColor = (pos, color) => {
        map[pos].style.backgroundColor = color;
    };
    let putToGameSmallChar = () => {
        // console.log(path)
        smallChar.src = path;
        smallChar.width = 30;
        smallChar.height = 30;
        map[position].append(smallChar);
    };
    let updateFuel = () => { level--; fuel.innerHTML = level;};
    let updateScore = (val) => {  result += val; score.innerHTML = result;};
    let getColor = (pos) =>{
        if(pos < 225 || pos >= 0){
            console.log(map[pos]);

            let imgs = map[pos].querySelector('img');
            if (imgs != null) {
                let srcs = imgs.getAttribute('src');
                if (srcs === './img/fuel.png') {
                    map[pos].removeChild(imgs);
                    putToGameColor(pos, colors[0]);
                    updateScore(10);
                }
            }
            return map[pos].style.backgroundColor;;
        }
        return null;
    };
    let downLevel = (pos) => {
        switch (getColor(pos)) {
            case colors[1]:
                putToGameColor(pos, colors[0]);
                map[pos].innerHTML = '';
                break;
            case colors[2]:
                putToGameColor(pos, colors[1]);
                map[pos].innerHTML = '1';
                break;
            case colors[3]:
                putToGameColor(pos, colors[2]);
                map[pos].innerHTML = '2';
                break;
            default:
                break;
        }
    };
    let getRandomInt = (max) => { return Math.floor(Math.random() * max); };

    return {
        getendofgame: () => {
            if (level === 0){
                deminor.actionreset();
            }

        },
        randFill: () => {
            let lev;
            let tank;
            for (let i = 0; i < 225; ++i) {
                lev = getRandomInt(4);
                if(getRandomInt(100) % 10 === 0){
                    tank = new Image();//ADD STRUCT TO direction
                    tank.src = './img/fuel.png';
                    tank.width = 35;
                    tank.height = 35;
                    map[i].append(tank);
                }
                else{
                    putToGameColor(i, colors[lev]);
                    if (lev > 0) {
                        map[i].innerHTML = lev;
                    }
                }

            }
            position = 112;
            putToGameColor(position, colors[0]);
            map[position].innerHTML = '';
            putToGameSmallChar();
            updateScore(0);
            updateFuel();
        },
        actionforward: () =>{
            let tmp;
            let tmp_pos = position;
            switch (aim) {
                case aimI.up:
                    if (tmp_pos > 14)
                        tmp = getColor(tmp_pos -= 15);
                    break;
                case aimI.left:
                    if ((position % 15) > 0)
                        tmp = getColor(tmp_pos -= 1);
                    break;
                case aimI.down:
                    if (tmp_pos < 210)
                        tmp = getColor(tmp_pos += 15);
                    break;
                case aimI.right:
                    if ((position % 15) < 14)
                        tmp = getColor(tmp_pos += 1);
                    break;
            }
            // console.log(map[tmp_pos].children[0]);
            // console.log(map[tmp_pos]);
            if (tmp !== null && tmp === colors[0]) {
                position = tmp_pos;
                putToGameSmallChar();
                // if (map[tmp_pos].children[0] === tank){
                //     level += 50;
                //     map[tmp_pos].re
                updateFuel();
            }
        },
        actionleft: () =>{
            // map[position].removeChild(smallChar);
            // console.log(td[2].cells[2].style.backgroundColor);
            switch (aim) {
                case aimI.up:
                    aim = aimI.left;
                    path = './img/tank_left.png';
                    break;
                case aimI.left:
                    aim = aimI.down;
                    path = './img/tank_down.png';
                    break;
                case aimI.down:
                    aim = aimI.right;
                    path = './img/tank_right.png';
                    break;
                case aimI.right:
                    aim = aimI.up;
                    path = './img/tank_up.png';
                    break;
            }
            // console.log(aim);
            // console.log(smallChar);//to debug
            // smallChar.src = './img/x.svg';//update img
            putToGameSmallChar();
        },
        actionright: () =>{
            // map[position].removeChild(smallChar);
            // console.log(aim);
            switch (aim) {
                case aimI.up:
                    aim = aimI.right;
                    path = './img/tank_right.png';
                    break;
                case aimI.right:
                    aim = aimI.down;
                    path = './img/tank_down.png';

                    break;
                case aimI.down:
                    aim = aimI.left;
                    path = './img/tank_left.png';
                    break;
                case aimI.left:
                    aim = aimI.up;
                    path = './img/tank_up.png';
                    break;
            }
            // console.log(aim);
            // console.log(aim);//to debug
            // smallChar.src = './img/x.svg';//update img
            putToGameSmallChar();
        },
        actionshoot: () =>{
            let tmp;
            let tmp_pos = position;
            switch (aim) {
                case aimI.up:
                    if (tmp_pos > 14)
                        tmp = getColor(tmp_pos -= 15);
                    break;
                case aimI.left:
                    if ((position % 15) > 0)
                        tmp = getColor(tmp_pos -= 1);
                    break;
                case aimI.down:
                    if (tmp_pos < 210)
                        tmp = getColor(tmp_pos += 15);
                    break;
                case aimI.right:
                    if ((position % 15) < 14)
                        tmp = getColor(tmp_pos += 1);
                    break;
            }
            if (tmp != null && tmp !== colors[0])
                downLevel(tmp_pos);
        },
        actionreset: () =>{
            map[position].removeChild(smallChar);
            for (let i = 0; i < 225; ++i) {
                map[i].innerHTML = '';
            }
            level = 51;
            result = 0;
            path = './img/tank_up.png';
            deminor.randFill();
        }
    }

}();


