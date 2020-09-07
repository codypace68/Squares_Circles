/*
    Stages update player and enemy data based on events/ user input.
    The Game class controls all on screen drawing and also handles interactions between stages, such as collision.
*/
import { Stage as stage} from './stages/stage.js';
import { EnemyStage as enemyStage} from './stages/enemyStage.js';
import { PlayerStage as playerStage} from './stages/playerStage.js';
import { Game as game} from './game/game.js';
import { levelDefs } from './levelDefs.js';

const MainStage = new stage('stage');
const EnemyStage = new enemyStage('enemy-stage');
const PlayerStage = new playerStage('player-stage');
const Game = new game(MainStage, PlayerStage, EnemyStage);
export {
    Game,
    levelDefs
};