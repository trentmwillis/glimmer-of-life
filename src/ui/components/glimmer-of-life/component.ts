import Component, { tracked } from "@glimmer/component";
import World from '../../../utils/world';

const n = 100;

export default class GlimmerOfLife extends Component {
  @tracked world = new World(n);

  private generation = 0;

  didInsertElement() {
    this.nextGeneration();
  }

  didUpdate() {
    this.nextGeneration();
  }

  nextGeneration() {
    if (this.generation > 10) { return; }
    this.generation++;
    requestAnimationFrame(() => this.world = this.world.tick());
  }
}
