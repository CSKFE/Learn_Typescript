/**
 * Let's make a game 🕹
 */
type MovePosition = 'up' | 'down' | 'right' | 'left';

type Position = {
  x: number;
  y: number;
};

const position:Position = {x: 0, y: 0};

function move(command:MovePosition):void {
  switch(command) {
    case 'up':
      position.y++;
      break;
    case 'down':
      position.y--;
      break;
    case 'right':
      position.x++;
      break;
    case 'left':
      position.x--;
      break;
    default:
      throw new Error('do not command');
  }
}
console.log(position); // { x: 0, y: 0}
move('up');
console.log(position); // { x: 0, y: 1}
move('down');
console.log(position); // { x: 0, y: 0}
move('left');
console.log(position); // { x: -1, y: 0}
move('right');
console.log(position); // { x: 0, y: 0}
