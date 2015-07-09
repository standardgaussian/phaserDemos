//Main phaser source
//Where's the module management!?

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });


var score = 0;
var scoreText;

function preload() {
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	game.load.image('diamond', 'assets/diamond.png');
}

function create() {
	
	game.physics.startSystem(Phaser.Physics.NINJA);
	game.physics.ninja.gravity = 2;
	game.physics.ninja.setBoundsToWorld();
	
	
	game.add.sprite(0,0,'sky');
	
	platforms = game.add.group();
	
	
	var ground = platforms.create(0,game.world.height - 64, 'ground');
	ground.scale.setTo(2, 2);
	
	game.physics.ninja.enable(ground);
	ground.body.immovable = true;
	ground.body.gravityScale = 0;
	
	var ledge = platforms.create(400,400, 'ground');
	
	game.physics.ninja.enable(ledge);
	ledge.body.immovable = true;
	ledge.body.gravityScale = 0;
	
	ledge = platforms.create(-150, 250, 'ground');
	
	game.physics.ninja.enable(ledge);
	ledge.body.immovable = true;
	ledge.body.gravityScale = 0;
	
	//wobbly player
	/*
	points = [];
	for (var i = 0; i < 32; i++) {
			points.push(new Phaser.Point(i, 0));	
	}*/
	//player = game.add.rope(32, game.world.height - 150, 'diamond', null, points);	
	//player.anchor = new Phaser.Point(0.5,0.5);
	player = game.add.sprite(64, game.world.height - 150, 'dude');
	game.physics.ninja.enable(player);
	player.body.bounce = 0.5;
	player.body.friction = 0;
	
	player.body.collideWorldBounds = true;
	
	var count = 0;
	/*
	player.updateAnimation = function() {
        count += 0.1;
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].y = Math.sin(i * 0.5  + count);
        }
    };*/
	
	//animations
	
	player.animations.add('left', [0,1,2,3], 10, true);
	player.animations.add('right',[5,6,7,8], 10, true);
	
	cursors = game.input.keyboard.createCursorKeys();
	
	//pushable object
	diamond = game.add.sprite(200, game.world.height - 150, 'diamond');
	game.physics.ninja.enable(diamond);
	diamond.body.collideWorldBounds = true;
	diamond.body.bounce = 0.5;
	
	
}

function update() {
	
	game.physics.ninja.collide(player, platforms);
	game.physics.ninja.collide(diamond, platforms);
	game.physics.ninja.collide(player, diamond);
	
	if (cursors.left.isDown) {
		player.body.moveLeft(150);
		player.animations.play('left');
	}
	
	else if (cursors.right.isDown) {
		player.body.moveRight(150);
		player.animations.play('right');
	}
	
	else {
		player.animations.stop();
		player.frame = 4;
	}
	
	if (cursors.up.isDown) {
		player.body.moveUp(150);
	}
	
	
}

