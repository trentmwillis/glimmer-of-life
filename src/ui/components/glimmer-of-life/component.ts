import Component, { tracked } from "@glimmer/component";
import World from '../../../utils/world';

const n = 100;

export default class GlimmerOfLife extends Component {
  @tracked world = new World(n);

  didInsertElement() {
    this.nextGeneration();
  }

  didUpdate() {
    this.nextGeneration();
  }

  nextGeneration() {
    requestAnimationFrame(() => this.world = this.world.tick());
  }
}
