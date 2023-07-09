'use strict';

let arr1 = [1, 2, 4];
let arr2 = [5, 6, 7];
let res = [...arr1, ...arr2];


// const switcher = document.querySelector('.btn');

// switcher.addEventListener('click', function() {
//     document.body.classList.toggle('light-theme');
//     document.body.classList.toggle('dark-theme');

//     const className = document.body.className;
//     if(className == "light-theme") {
//         this.textContent = "Dark";
//     } else {
//         this.textContent = "Light";
//     }
// });


let mechanism = {
    type: "flying"
}

let car = {
    mark: "Renault",
    model: "Mageane",
    move() {
        return `${this.mark} ${this.model}`;
    },
    get markModel() {
        return `${this.mark} ${this.model}`;
    },
}

car.velocity = 54;


function f(ca) {
    for (let i in ca) {
        console.log(i);
    }
}

function validate(obj, lowValue, highValue) {
    if (obj.value < lowValue || obj.highValue > highValue) {
        alert("invalid value " + obj);
    }
}

// const myInterval = setInterval(callback, 2000);
// const but = document.querySelector('.butfirst');



// function callback() {
//     // if (but.classList.contains('butfirst')){
//     //     but.classList.remove('butfirst')
//     //     but.classList.add('butsecond');
//     // }
//     // else{
//     //     but.classList.remove('butsecond')
//     //     but.classList.add('butfirst');
//     // }

//     but.classList.toggle('butfirst');
//     but.classList.toggle('butsecond');

// }

let newImage = new Image();
newImage.src = 'https://cdn2.iconfinder.com/data/icons/animals-92/28/animal_lineal_color-42-512.png';

let apple = new Image();
apple.src = 'https://www.iconpacks.net/icons/2/free-apple-icon-3155-thumb.png';

//let apple = document.getElementById('appple');

let canvas = document.getElementById("canva");

let snakeArray = [];

let head;

let appleCountTextBox = document.getElementById('appleCount');
let appleCount = 0;

let currentSnakeDirection = 'KeyD';

// function draw() {
//     // let canvas = document.getElementById("canva");
//     if (canvas.getContext) {
//         var ctx = canvas.getContext("2d");

//         for (let i = 0; i < canvas.height; i++) {
//             for (let j = 0; j < canvas.width; j++) {
//                 if ((i + j) % 2 === 0) {
//                     ctx.fillStyle = "rgb(200,0,0)";
//                     ctx.fillRect(i * 20, j * 20, 20, 20);
//                 }
//                 else {
//                     ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
//                     ctx.fillRect(i * 20, j * 20, 20, 20);
//                 }
//             }
//         }


//         //When it loads
//         newImage.onload = () => {
//             // Draw the image onto the context
//             ctx.drawImage(newImage, 0, 0, 20, 20);
//         }

//     }
// }






// function logKey(e) {
//   alert(e.code);
// }




// clearInterval(myInterval);
//   // release our intervalID from the variable
//   myInterval = null;





//draw();


//-1 яблуко
//1 зайнята змійкою
//0 вільна


//x
//y
// value
// wsad --> w | s | a | d  --> w - заборона руху вгору, ...
//які напрямки заборонені для руху

//клас, що описує заборонені напрямкти
class ForbiddenDirections {
    constructor(W, S, A, D) {
        this.W = W;
        this.S = S;
        this.A = A;
        this.D = D;
    }
}

//клас, що описує точку
class Point {
    constructor(x, y, value, forbiddenDirections) {
        this.x = x;
        this.y = y;

        this.value = value;
        this.forbiddenDirections = forbiddenDirections;
    }

    get X() {
        return this.X;
    }
    set X(value) {
        if (value > 5 || value < 0)
            throw 'the x coordinate must be at range 0 4';
    }

}

//i=0 - w
//i=fieldWidth-1 -s
//j=0 -a
//j=fieldHeight-1 d

//отримуємуо висоту і ширину канваса
function createEmptyField(width, height) {
    let field = [];
    const emptyMarker = 0;
    let fieldWidth = width / 20;
    let fieldHeight = height / 20;
    let curPoint;

    for (let j = 0; j < fieldHeight; j++) {
        for (let i = 0; i < fieldWidth; i++) {
            let forbDir = new ForbiddenDirections();
            if (j === 0) {
                forbDir.W = "w";
            }
            if (j === fieldWidth - 1) {
                forbDir.S = "s";
            }
            if (i === 0) {
                forbDir.A = "a";
            }
            if (i === fieldHeight - 1) {
                forbDir.D = "d";
            }
            //якщо є власна властивість у об’єкта і значення цієї властивості undefined , тоді пишемо null
            for (let prop in forbDir) {
                if (forbDir.hasOwnProperty(prop) && forbDir[prop] === undefined) {
                    forbDir[prop] = null;
                }
            }
            curPoint = new Point(i, j, emptyMarker, forbDir);
            field.push(curPoint);
        }
    }
    //field.pop();
    //field.push(new Point(4,4,-1,new ForbiddenDirections(null,"s",null,"d")));

    //змійка у першій комірці
    field[0].value = 1;

    head = field[0];

    //field[3].value = -1;
    field = randomApple(field);


    // field.forEach(item=>{
    //     console.log(printPointValues(item));
    //     })



    snakeArray.push(field[0]);//тепер один елемент складає змійку
    return field;
}

canvas.addEventListener("load", (event) => {

    //треба змінити значення 1 точки на змійку
    // і викликати функцію рандмної генерування яблука
    //і теж змінити значення точки
})




function printPointValues(obj) {
    res = '';
    //їдемо по всіх властивостях
    for (let val in obj) {
        if (obj.hasOwnProperty(val)) {//якщо це його властивості
            if (typeof obj[val] === 'object') {//якщо це властивість типу object
                if (obj[val] === null) {//null не хотіло додавати, явно описав
                    res = res + 'null' + ' ';
                }
                res = res + printPointValues(obj[val]) + ' ';
            }
            else {//просто властивість, додайємо її значення до рядка
                res = res + obj[val] + ' ';
            }
        }
    }
    return res;
}




let field = createEmptyField(canvas.width, canvas.height);

// field.forEach(item=>{
//     console.log(printPointValues(item));
// })


function checkIfAppleExistInField(field) {
    return field.some(item => item.value === -1);
}


function randomApple(field) {
    while (true) {
        let i = Math.floor(Math.random() * 5);
        let j = Math.floor(Math.random() * 5);

        //перевіряємо не просто на якщо клітинка зайнята змійкою,
        //а на те, що ця клітинка вільна
        //до цього була умова field[k].x === i && field[k].y === j && field[k].value===1
        //страшно важко було це знайти
        let r = false;
        for (let k = 0; k < field.length; k++) {
            if (field[k].x === i && field[k].y === j && field[k].value !== 0) {
                r = true;
                break;
            }
        }

        if (!r) {//ці i та j нам підходять - там не має змійки
            for (let k = 0; k < field.length; k++) {
                if (field[k].x === i && field[k].y === j) {
                    field[k].value = -1;
                }
            }
            break;
        }
    }
    return field;
}


// field.forEach(item=>{
//          console.log(printPointValues(item));
//      });


function drawField(field) {
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < field.length; i++) {
            //малюємо клітинки
            if ((field[i].x + field[i].y) % 2) {
                ctx.fillStyle = "rgb(250,220,99)";
                ctx.fillRect(field[i].x * 20, field[i].y * 20, 20, 20);
            }
            else {
                ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
                ctx.fillRect(field[i].x * 20, field[i].y * 20, 20, 20);
            }
            //малюємо змійку
            // if (field[i].value === 1) {
            //     ctx.drawImage(newImage, field[i].x * 20, field[i].y * 20, 20, 20);
            // }
            if (field[i].value === 1) {
                ctx.fillStyle = "rgba(48, 169, 22, 1)";
                ctx.fillRect(field[i].x * 20, field[i].y * 20, 20, 20);
            }
            //малюємо ябко
            if (field[i].value === -1) {
                // setTimeout(() => {
                //     ctx.drawImage(apple, field[i].x*20, field[i].y*20, 20, 20);
                // }, 1);
                ctx.drawImage(apple, field[i].x * 20, field[i].y * 20, 20, 20);
            }

            if (field[i].x === head.x && field[i].y === head.y){
                ctx.fillStyle = "rgba(189, 2, 39, 1)";
                ctx.fillRect(field[i].x * 20, field[i].y * 20, 20, 20);
            }
            

        }

        //по дефолту змійка в першій клітинці,
        //грузимо при старті 
        newImage.onload = () => {
            // Draw the image onto the context
            //ctx.drawImage(newImage, field[0].x*20, field[0].y*20, 20, 20);

            //ctx.drawImage(apple, field[1].x*20, field[1].y*20, 20, 20);

            //newImage.src = 'https://cdn2.iconfinder.com/data/icons/animals-92/28/animal_lineal_color-42-512.png';


            //apple.src = 'https://www.iconpacks.net/icons/2/free-apple-icon-3155-thumb.png';

        }

    }
}






function positionOfHead(field) {
    for (let i = 0; i < field.length; i++) {
        if (field[i].value === 1) {

            return field[i];
        }
    }
    return null; // Повертаємо null, якщо голова не знайдена
}

let lastKeyPressTime = 0;


function moveForOnePoint(field, directionForMove) {
    //визначаємо позиції нової точки, спочатку вони спіпадають із поточною
    let newPosX = head.x;
    let newPosY = head.y;

    let previosKey = null;

    switch (directionForMove) {
        case 'KeyA':
            newPosX = newPosX - 1;
            currentSnakeDirection = 'KeyA';
            previosKey = 'KeyA';
            break;
        case 'KeyW':
            newPosY = newPosY - 1;
            currentSnakeDirection = 'KeyW';
            previosKey = 'KeyW';
            break;
        case 'KeyS':
            newPosY = newPosY + 1;
            currentSnakeDirection = 'KeyS';
            previosKey = 'KeyS';
            break;
        case 'KeyD':
            newPosX = newPosX + 1;
            currentSnakeDirection = 'KeyD';
            previosKey = 'KeyD';
            break;
    }

    // lastKeyPressTime = currentTime;

    //вернемо індекс точки  у полі, яка співпаде із новою позицією, куди треба переміститись
    const newIndexInField = field.findIndex(point =>
        point.x === newPosX && point.y === newPosY
    );

    gameOverRule(currentSnakeDirection, snakeArray);

    if (newIndexInField !== -1) {//якщо знайдено індекс нової голови?
        //якщо є яблучко там де маємо поставити нову голову
        if (field[newIndexInField].value === -1) {
            field[newIndexInField].value = 1;//можна і без цього, але тоді head.value = -1 - це не важливо бо у fill все рівно перетурться в 1 всі точки у полі як є в іsnakeArra

            //gameOverRule(currentSnakeDirection,snakeArray);

            head = field[newIndexInField];//голова буде точкою із яблучком (по факту value голови буде -1, але у функції fill всі значення що snake у field будуть в 1 - нас цікавить по факту x та y)

            snakeArray.push(head);//додаємо голову до змійки

            field = fillFieldWithSnakeArray(field, snakeArray);//підчищаємо поле, занулюємо потрібн "пройдені" клітинки

            field = randomApple(field);
            appleCountTextBox.value = ++appleCount;
        }
        else {// не має яблучка
            field[newIndexInField].value = 1;//ставимо у нову точку, де нова голова 1



            head = field[newIndexInField];//ця точка буде головою
            //зсув змійки


            snakeArray.push(head);//додали в кінець голову
            snakeArray.shift();//видалили перший елемент із змійки


            field = fillFieldWithSnakeArray(field, snakeArray);

        }
    }

    return field;
}



function move(directionForMove, field) {
    let newPosX = head.x;
    let newPosY = head.y;
    // Виконуємо логіку для натиснутої клавіші
    switch (directionForMove) {
        case 'KeyA':
            // Логіка для клавіші A
            newPosX = newPosX - 1;
            currentSnakeDirection = directionForMove;
            console.log("A");
            break;
        case 'KeyW':
            // Логіка для клавіші W
            newPosY = newPosY - 1;
            currentSnakeDirection = directionForMove;
            console.log("W");
            break;
        case 'KeyS':
            // Логіка для клавіші S
            newPosY = newPosY + 1;
            currentSnakeDirection = directionForMove;
            console.log("S");
            break;
        case 'KeyD':
            // Логіка для клавіші D
            newPosX = newPosX + 1;
            currentSnakeDirection = directionForMove;
            console.log("D");
            break;
    }
    //вернемо індекс точки  у полі, яка співпаде із новою позицією, куди треба переміститись
    const newIndexInField = field.findIndex(point =>
        point.x === newPosX && point.y === newPosY
    );

    gameOverRule(currentSnakeDirection, snakeArray);

    if (newIndexInField !== -1) {//якщо знайдено індекс нової голови?
        //якщо є яблучко там де маємо поставити нову голову
        if (field[newIndexInField].value === -1) {
            field[newIndexInField].value = 1;//можна і без цього, але тоді head.value = -1 - це не важливо бо у fill все рівно перетурться в 1 всі точки у полі як є в іsnakeArra
            //gameOverRule(currentSnakeDirection,snakeArray);
            head = field[newIndexInField];//голова буде точкою із яблучком (по факту value голови буде -1, але у функції fill всі значення що snake у field будуть в 1 - нас цікавить по факту x та y)
            snakeArray.push(head);//додаємо голову до змійки
            field = fillFieldWithSnakeArray(field, snakeArray);//підчищаємо поле, занулюємо потрібн "пройдені" клітинки
            field = randomApple(field);
            appleCountTextBox.value = ++appleCount;
        }
        else {// не має яблучка
            field[newIndexInField].value = 1;//ставимо у нову точку, де нова голова 1
            head = field[newIndexInField];//ця точка буде головою
            //зсув змійки
            snakeArray.push(head);//додали в кінець голову
            snakeArray.shift();//видалили перший елемент із змійки
            field = fillFieldWithSnakeArray(field, snakeArray);
        }
    }
    return field;


}




function createKeyHandlerForHuman() {
    const keyStates = {};//для збереження часу останнього натискання кожної клавіші

    return function (event, field) {
        const key = event;
        //let previosKey;

        // Якщо клавіша була вже натиснута протягом 1 секунди, ігноруємо її
        if (keyStates[key] && Date.now() - keyStates[key] < 1000) {
            console.log("aaaaaaaaaaaaaaa");
            currentSnakeDirection = key;
            return field;
        }

        keyStates[key] = Date.now();//записуємо поточний час, як значення властивлсті для кнопки

        field = move(key,field);

        // let newPosX = head.x;
        // let newPosY = head.y;

        // // Виконуємо логіку для натиснутої клавіші
        // switch (key) {
        //     case 'KeyA':
        //         // Логіка для клавіші A
        //         newPosX = newPosX - 1;
        //         currentSnakeDirection = 'KeyA';
        //         console.log("A");
        //         break;
        //     case 'KeyW':
        //         // Логіка для клавіші W
        //         newPosY = newPosY - 1;
        //         currentSnakeDirection = 'KeyW';
        //         console.log("W");
        //         break;
        //     case 'KeyS':
        //         // Логіка для клавіші S
        //         newPosY = newPosY + 1;
        //         currentSnakeDirection = 'KeyS';
        //         console.log("S");
        //         break;
        //     case 'KeyD':
        //         // Логіка для клавіші D
        //         newPosX = newPosX + 1;
        //         currentSnakeDirection = 'KeyD';
        //         console.log("D");
        //         break;
        // }


        // // if (key === previosKey) {
        // //     console.log("Ignored key press");
        // //     return field;
        // // }

        // // previosKey = key;

        // //вернемо індекс точки  у полі, яка співпаде із новою позицією, куди треба переміститись
        // const newIndexInField = field.findIndex(point =>
        //     point.x === newPosX && point.y === newPosY
        // );

        // gameOverRule(currentSnakeDirection, snakeArray);

        // if (newIndexInField !== -1) {//якщо знайдено індекс нової голови?
        //     //якщо є яблучко там де маємо поставити нову голову
        //     if (field[newIndexInField].value === -1) {
        //         field[newIndexInField].value = 1;//можна і без цього, але тоді head.value = -1 - це не важливо бо у fill все рівно перетурться в 1 всі точки у полі як є в іsnakeArra
        //         //gameOverRule(currentSnakeDirection,snakeArray);
        //         head = field[newIndexInField];//голова буде точкою із яблучком (по факту value голови буде -1, але у функції fill всі значення що snake у field будуть в 1 - нас цікавить по факту x та y)
        //         snakeArray.push(head);//додаємо голову до змійки
        //         field = fillFieldWithSnakeArray(field, snakeArray);//підчищаємо поле, занулюємо потрібн "пройдені" клітинки
        //         field = randomApple(field);
        //         appleCountTextBox.value = ++appleCount;
        //     }
        //     else {// не має яблучка
        //         field[newIndexInField].value = 1;//ставимо у нову точку, де нова голова 1
        //         head = field[newIndexInField];//ця точка буде головою
        //         //зсув змійки
        //         snakeArray.push(head);//додали в кінець голову
        //         snakeArray.shift();//видалили перший елемент із змійки
        //         field = fillFieldWithSnakeArray(field, snakeArray);
        //     }
        // }
        return field;
    };
}

const keyHandler = createKeyHandlerForHuman();





function fillFieldWithSnakeArray(field, snakeArr) {
    //змінюємо поле
    field.forEach(element => {
        //скидуємо комірки, які були встановлені в 1 (яблучка не чіпаємо)
        if (element.value === 1 && element.value !== -1) {
            element.value = 0;
        }
        //всі комірки, які в snakeArr треба підсвітити у field
        if (snakeArr.some(se => se.x === element.x && se.y === element.y)) {
            element.value = 1;
        }
    });

    return field;
}





document.addEventListener("keypress", (e) => {
    //  field = moveForOnePointByHuman(field, e.code);
    //  drawField(field);
    field = keyHandler(e.code, field);
    drawField(field);
});

apple.onload = () => {
    drawField(field);
};




const myInterval = setInterval(callback, 1000);
//const startDirection = 'KeyD';




function whatToDoWhenGameOvere() {
    clearInterval(myInterval);
    alert('loooser');
}

function gameOverRule(currentDir, snakeArr) {
    let curHead = snakeArr[0];

    if ((head.forbiddenDirections.D === 'd' && currentDir === 'KeyD') ||
        (head.forbiddenDirections.A === 'a' && currentDir === 'KeyA') ||
        (head.forbiddenDirections.W === 'w' && currentDir === 'KeyW') ||
        (head.forbiddenDirections.S === 's' && currentDir === 'KeyS')) {
        whatToDoWhenGameOvere();
    }

    if (snakeArr.some((point, index) =>
        curHead.x === point.x && curHead.y === point.y && index !== 0
    )) {
        whatToDoWhenGameOvere();
    }
}


function callback() {
    //field = moveForOnePoint(field, currentSnakeDirection);

    field = move(currentSnakeDirection,field);

    //field = keyHandler(currentSnakeDirection,field);
    //console.log(currentSnakeDirection);


    drawField(field);
}











//console.log(printPointValues(createEmptyField(100,100)[0]));





