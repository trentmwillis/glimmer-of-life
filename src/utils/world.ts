import Citizen from './citizen';

export default class World {
  citizens: Array<Array<Citizen>>;
  size: number;

  constructor(size: number, citizens?: Array<Array<Citizen>>) {
    this.size = size;

    if (citizens) {
      this.citizens = citizens;

      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          this.citizens[i][j].addNeighbors(this.findNeighbors(i, j));
        }
      }
    } else {
      this.citizens = new Array(size);

      for (let i = 0; i < size; i++) {
        this.citizens[i] = new Array(size);

        for (let j = 0; j < size; j++) {
          let alive = Math.random() < 0.5 ? true : false;
          this.citizens[i][j] = new Citizen(alive);
        }
      }

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          this.citizens[i][j].addNeighbors(this.findNeighbors(i, j));
        }
      }
    }

  }

  findNeighbors(i, j): Array<Citizen> {
    const max = this.size - 1;

    const left = i - 1 < 0 ? max : i - 1;
    const right = i + 1 > max ? 0 : i + 1;

    const up = j - 1 < 0 ? max : j - 1;
    const down = j + 1 > max ? 0 : j + 1;

    return [
      this.citizens[left][j],
      this.citizens[right][j],
      this.citizens[i][up],
      this.citizens[i][down],
      this.citizens[left][up],
      this.citizens[left][down],
      this.citizens[right][up],
      this.citizens[right][down]
    ];
  }

  tick(): World {
    const newCitizens: Array<Array<Citizen>> = new Array(this.size);

    for (let i = 0; i < this.size; i++) {
      newCitizens[i] = new Array(this.size);

      for (let j = 0; j < this.size; j++) {
        newCitizens[i][j] = this.citizens[i][j].tick();
      }
    }

    return new World(this.size, newCitizens);
  }
}
