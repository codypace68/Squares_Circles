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
                "quanity": 10
            },
            {
                "class": "Square",
                "quanity": 1 
            }
        ]
    },
    "3": {
        levelUpText: "Level 3 has been slain!",
        enemies: [{
            "class": "Circle",
            "quanity": 12
        },
        {
            "class": "Square",
            "quanity": 5
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
            "quanity": 1
        },
        {
            "class": "Square",
            "quanity": 5
        }]
    },
    "5": {
        levelUpText: "Level 5 is easy ;]",
        enemies: [{
            "class": "Circle",
            "quanity": 15
        },
        {
            "class": "TrackingSquare",
            "quanity": 1
        },
        {
            "class": "Square",
            "quanity": 10
        }]
    },
    "6": {
        levelUpText: "Time to bring the heat!!",
        enemies: [{
            "class": "Circle",
            "quanity": 20
        },
        {
            "class": "TrackingSquare",
            "quanity": 2
        },
        {
            "class": "Square",
            "quanity": 15
        }]
    },
    "7": {
        levelUpText: "Ooooo i see how it is. Such a 'Master'. ",
        enemies: [{
            "class": "Circle",
            "quanity": 15
        },
        {
            "class": "Square",
            "quanity": 10
        },
        {
            "class": "FastSquare",
            "quanity": 1
        }]
    },
    "8": {
        levelUpText: "Ohh just you wait till level 9. It's ridiculous! Muahahah!",
        enemies: [{
            "class": "Circle",
            "quanity": 25
        },
        {
            "class": "Square",
            "quanity": 10
        },
        {
            "class": "FastSquare",
            "quanity": 4
        }]
    },
    "9": {
        levelUpText: "What have you got to do to get rid of this zed?",
        enemies: [{
            "class": "Circle",
            "quanity": 20
        },
        {
            "class": "TrackingSquare",
            "quanity": 2
        },
        {
            "class": "FastSquare",
            "quanity": 4
        },{
            "class": "Square",
            "quanity": 5
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