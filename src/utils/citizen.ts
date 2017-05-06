export default class Citizen {
  alive: boolean;
  neighbors: Array<Citizen>;

  constructor(alive: boolean) {
    this.alive = alive;
    this.neighbors = [];
  }

  addNeighbors(citizens: Array<Citizen>) {
    this.neighbors.push(...citizens);
  }

  changeStatus() {
    this.alive = !this.alive;
  }

  tick(): Citizen {
    let alive = this.alive;

    let aliveNeighbors = 0;
    for (let i = 0; i < 8; i++) {
      if (this.neighbors[i].alive) {
        aliveNeighbors++;
      }
    }

    if (alive) {
      if (aliveNeighbors < 2) {
        alive = false;
      } else if (aliveNeighbors > 3) {
        alive = false;
      }
    } else if (aliveNeighbors === 3) {
      alive = true;
    }

    return new Citizen(alive);
  }
}
