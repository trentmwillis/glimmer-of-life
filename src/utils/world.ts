import Citizen from './citizen';

export default class World {
  citizens: Array<Citizen>;
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
    const citizens: Array<Citizen> = this.citizens = new Array(size);

    for (let i = 0; i < size; i++) {
      const offset = i * size;

      for (let j = 0; j < size; j++) {
        citizens[offset + j] = {
          alive: Math.random() < 0.2 ? true : false
        };
      }
    }
  }

  populateNextGeneration(previousGeneration: World) {
    const size = this.size;

    const citizens: Array<Citizen> = this.citizens = new Array(size);

    for (let i = 0; i < size; i++) {
      const offset = i * size;

      for (let j = 0; j < size; j++) {
        const previousGenerationCitizen: Citizen = previousGeneration.citizens[offset + j];
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

        citizens[offset + j] = { alive };
      }
    }
  }

  findNeighbors(i, j): Array<Citizen> {
    const citizens = this.citizens;
    const max = this.size - 1;

    const up = (i - 1 < 0 ? max : i - 1) * this.size;
    const down = (i + 1 > max ? 0 : i + 1) * this.size;
    const center = i * this.size;

    const left = j - 1 < 0 ? max : j - 1;
    const right = j + 1 > max ? 0 : j + 1;

    return [
      citizens[up + j],
      citizens[up + left],
      citizens[up + right],
      citizens[center + left],
      citizens[center + right],
      citizens[down + j],
      citizens[down + left],
      citizens[down + right]
    ];
  }

  nextGeneration(): World {
    return new World(this.size, this);
  }
}
