import Component, { tracked } from "@glimmer/component";
import World from '../../../utils/world';

const n = 100;

export default class GlimmerOfLife extends Component {
  @tracked running = false;
  @tracked world = new World(n);

  didUpdate() {
    this.nextGeneration();
  }

  nextGeneration() {
    if (!this.running) { return; }
    requestAnimationFrame(() => this.world = this.world.tick());
  }

  toggle() {
    this.running = !this.running;
  }
}
