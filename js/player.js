export default class Player {
    constructor(scene) {
        // Creación del sprite del jugador
        this.scene = scene; // ✅ Guarda la escena
        this.player = scene.physics.add.sprite(100, 450, 'player_right').setScale(0.5);
        this.player.setCollideWorldBounds(true);
        
        // Crear las animaciones
        scene.anims.create({
            key: 'walk_right',
            frames: scene.anims.generateFrameNumbers('player_right', { start: 1, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'walk_left',
            frames: scene.anims.generateFrameNumbers('player_left', { start: 1, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'jump',
            frames: scene.anims.generateFrameNumbers('player_jump', { start: 1, end: 5 }),
            frameRate: 5,
            repeat: -1
        });

        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('player_idle', { start: 1, end: 7 }),
            frameRate: 6,
            repeat: -1
        });

        // Crear los controles
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    update() {
        console.log(`X: ${this.player.x}, Y: ${this.player.y}`);

        // Movimiento del jugador
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('walk_left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('walk_right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('idle', true);
        }

        // Salto
        if (this.cursors.space.isDown && this.player.body.blocked.down) {
            this.player.setVelocityY(-400);
            this.player.anims.play('jump', true);
        }

        // Evitar que la animación de salto se reproduzca cuando ya está en el aire
        if (this.player.body.velocity.y !== 0 && !this.player.body.blocked.down) {
            this.player.anims.play('jump', true);
        }
    }
}
