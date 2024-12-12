import { Game } from './game';

export interface GameDetails extends Game {
  status: string;
  description: string;
  minimum_system_requirements: SystemRequirements;
  screenshots: Screenshot[];
}

export interface SystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

export interface Screenshot {
  id: number;
  image: string;
}
