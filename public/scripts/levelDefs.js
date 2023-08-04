const levelDefs = {
    "1": {
        levelUpText: "Congrats! You beat level 1. Consider your feet wet.",
        enemies: [{
                "class": "Circle",
                "quanity": 1,
            }
        ]
    },
    "2": {
        levelUpText: "You beat level two! Not too bad for a noob",
        enemies: [{
                "class": "Circle",
                "quanity": 1
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
            "quanity": 3
        },
        {
            "class": "Square",
            "quanity": 2
        }]
    },
    "4": {
        levelUpText: "Wow, level 4 too? Maybe you could be the one..",
        enemies: [{
            "class": "Circle",
            "quanity": 8
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
            "quanity": 10
        },
        {
            "class": "TrackingSquare",
            "quanity": 1
        },
        {
            "class": "Square",
            "quanity": 7
        }]
    },
    "6": {
        levelUpText: "Time to bring the heat!!",
        enemies: [{
            "class": "Circle",
            "quanity": 15
        },
        {
            "class": "TrackingSquare",
            "quanity": 2
        },
        {
            "class": "Square",
            "quanity": 11
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
        levelUpText: "What have you got to do to get rid of this zed? Let's size you up!",
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
    },
    "10": {
        levelUpText: "Go to the next level Sucka!",
        enemies: [{
                "class": "Circle",
                "quanity": 20,
            },
            {
                "class": "Square",
                "quanity": 2
            },
            {
                "class": "TrackingSquare",
                "quanity": 1
            },
            {
                "class": "AlternatingSizeCircle",
                "quanity": 5
            },
            {
                "class": "FastSquare",
                "quanity": 0
            },
            {
                "class": "LaserSquare",
                "quanity": 0
            }
        ]
    },
    "11": {
        levelUpText: "how bout a little of each?",
        enemies: [{
            "class": "AlternatingSizeCircle",
            "quanity": 5
        }]
    },
    "12": {
        levelUpText: "hmmmm.. this calls for strategery. Don't eat to fast ;)",
        enemies: [{
            "class": "Circle",
            "quanity": 2
        },
        {
            "class": "TrackingSquare",
            "quanity": 1
        },
        {
            "class": "FastSquare",
            "quanity": 1
        },{
            "class": "Square",
            "quanity": 1
        },{
            "class": "AlternatingSizeCircle",
            "quanity": 5
        }]
    },
    "13": {
        levelUpText: "Well i just can't believe it. Well this next level should throw you for a Loop!!",
        enemies: [{
            "class": "Square",
            "quanity": 7
        },{
            "class": "AlternatingSizeCircle",
            "quanity": 5
        },]
    },
    "14": {
        levelUpText: "TeeHee",
        enemies: [{
            "class": "Circle",
            "quanity": 2
        },
        {
            "class": "TrackingSquare",
            "quanity": 20
        }]
    },
    "14": {
        levelUpText: "hmmmm.. this calls for strategery. Don't eat to fast ;)",
        enemies: [{
            "class": "Circle",
            "quanity": 2
        },
        {
            "class": "TrackingSquare",
            "quanity": 1
        },
        {
            "class": "FastSquare",
            "quanity": 1
        },{
            "class": "Square",
            "quanity": 1
        },{
            "class": "AlternatingSizeCircle",
            "quanity": 5
        }]
    },
    "15": {
        levelUpText: "ohh wow wow wow!",
        enemies: [{
            "class": "Circle",
            "quanity": 40
        },
        {
            "class": "TrackingSquare",
            "quanity": 0
        },
        {
            "class": "FastSquare",
            "quanity": 0
        },{
            "class": "Square",
            "quanity": 10
        },{
            "class": "AlternatingSizeCircle",
            "quanity": 10
        },{
            "class": "LaserSquare",
            "quanity": 1
        }]
    }
};

export {levelDefs};