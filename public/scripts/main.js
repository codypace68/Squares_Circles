/*
    Stages update player and enemy data based on events/ user input.
    The Game class controls all on screen drawing and also handles interactions between stages, such as collision.
*/
const levelDefs = {
    "1": {
        levelUpText: "Congrats! You beat level 1. Consider your feet wet.",
        enemies: [{
                "class": "Circle",
                "quanity": 1,
            },
            {
                "class": "Square",
                "quanity": 0
            },
            {
                "class": "TrackingSquare",
                "quanity": 0
            },
            {
                "class": "AlternatingSizeCircle",
                "quanity": 0
            },
            {
                "class": "FastSquare",
                "quanity": 0
            }
        ]
    },
    "2": {
        levelUpText: "You beat level two! Not too bad for a noob",
        enemies: [{
                "class": "Circle",
                "quanity": 25
            },
            {
                "class": "FastSquare",
                "quanity": 5
            }
        ]
    },
    "3": {
        levelUpText: "Level 3 has been slain!",
        enemies: [{
            "class": "Circle",
            "quanity": 5
        },
        {
            "class": "TrackingSquare",
            "quanity": 7
        }]
    },
    "4": {
        levelUpText: "Wow, level 4 too? Maybe you could be the one..",
        enemies: [{
            "class": "Circle",
            "quanity": 15
        },
        {
            "class": "TrackingSquare",
            "quanity": 2
        },
        {
            "class": "FastSquare",
            "quanity": 4
        }]
    }
};

import {
    Stage as stage
} from './stages/stage.js';
import {
    EnemyStage as enemyStage
} from './stages/enemyStage.js';
import {
    PlayerStage as playerStage
} from './stages/playerStage.js';
import {
    Game as game
} from './game/game.js';

const MainStage = new stage('stage');
const EnemyStage = new enemyStage('enemy-stage');
const PlayerStage = new playerStage('player-stage');
const Game = new game(MainStage, PlayerStage, EnemyStage);
console.log('test')
export {
    Game,
    levelDefs
};