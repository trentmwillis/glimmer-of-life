import Citizen from './citizen';

export default class World {
  citizens: Array<Array<Citizen>>;
  size: number;

  constructor(size: number, previousGeneration?: World) {
    this.size = size;
    this.populate(previousGeneration);
  }

  populate(previousGeneration: World) {
    if (previousGeneration) {
      this.populateNextGeneration(previousGeneration);
    } else {
      this.populateNewWorld();
    }
  }

  populateNewWorld() {
    const size = this.size;
    const citizens = this.citizens = new Array(size);

    for (let i = 0; i < size; i++) {
      const row = citizens[i] = new Array(size);

      for (let j = 0; j < size; j++) {
        row[j] = {
          alive: Math.random() < 0.2 ? true : false
        };
      }
    }
  }

  populateNextGeneration(previousGeneration: World) {
    const size = this.size;

    const citizens = this.citizens = new Array(size);

    for (let i = 0; i < size; i++) {
      const row = citizens[i] = new Array(size);

      for (let j = 0; j < size; j++) {
        const previousGenerationCitizen = previousGeneration.citizens[i][j];
        const neighbors = previousGeneration.findNeighbors(i, j);

        let alive = previousGenerationCitizen.alive;

        let aliveNeighbors = 0;
        for (let i = 0; i < 8; i++) {
          if (neighbors[i].alive) {
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

        row[j] = { alive };
      }
    }
  }

  findNeighbors(i, j): Array<Citizen> {
    const citizens = this.citizens;
    const max = this.size - 1;

    const upIndex = i - 1 < 0 ? max : i - 1;
    const downIndex = i + 1 > max ? 0 : i + 1;

    const up = citizens[upIndex];
    const center = citizens[i];
    const down = citizens[downIndex];

    const left = j - 1 < 0 ? max : j - 1;
    const right = j + 1 > max ? 0 : j + 1;

    return [
      up[j],
      up[left],
      up[right],
      center[left],
      center[right],
      down[j],
      down[left],
      down[right]
    ];
  }

  nextGeneration(): World {
    return new World(this.size, this);
  }
}
