import Player from './player.js';
import Plataforms from './plataforms.js'; // Asegúrate de importar la clase Plataforms

const config = {
    type: Phaser.AUTO, // Phaser elige automáticamente el renderizador más adecuado (WebGL o Canvas)
    width: window.innerWidth,  // Usa el ancho completo de la ventana
    height: window.innerHeight, // Usa el alto completo de la ventana
    physics: {
        default: 'arcade', // Usamos el sistema de física Arcade de Phaser
        arcade: {
            gravity: { y: 500 }, // La gravedad es hacia abajo con una fuerza de 500
            debug: false // Desactivamos el modo de depuración para no ver la información de física en pantalla
        }
    },
    scene: { 
        preload: preload,  // Función que se ejecuta para cargar los assets del juego
        create: create,    // Función que se ejecuta una vez cargados los assets, para crear el juego
        update: update     // Función que se ejecuta cada frame, para actualizar la lógica del juego
    }
};

// Crear la instancia del juego
let game = new Phaser.Game(config);

let player;
let platforms; // Ahora se inicializa con la clase

function preload() {
    // Cargamos las imágenes y sprites que utilizaremos en el juego
    this.load.image('background', '/Assets/backgrounds/fonda.jpg'); 
    this.load.image('platform', 'plataformas.png');
    this.load.spritesheet('player_right', 'Assets/sprites/Skin_Baikal/RightBaikal.png', { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet('player_left', 'Assets/sprites/Skin_Baikal/LeftBaikal.png', { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet('player_jump', 'Assets/sprites/Skin_Baikal/Baikal_Salto.png', { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet('player_idle', 'Assets/sprites/Skin_Baikal/Baikai_Quieta (1).png', { frameWidth: 256, frameHeight: 256 });
}

function create() {
    // Crear el fondo, ajustándolo al tamaño completo de la pantalla
    this.add.image(0, 0, 'background')
    .setOrigin(0, 0) // Asegura que el fondo comience en la esquina superior izquierda
    .setDisplaySize(window.innerWidth, window.innerHeight); // Ajusta el fondo al tamaño de la pantalla


    // Crear el jugador (usando la clase Player)
    player = new Player(this);
    player.player.setVisible(true);

    
     // Crear las plataformas (usando la clase Plataforms)
    platforms = new Plataforms(this);
    // Agregar colisión entre el jugador y las plataformas
    this.physics.add.collider(player.player, platforms.plataforms);
    
    
}

function update() {
    // Llamamos a la función de actualización del jugador para moverlo, animarlo, etc.
    player.update();
}

// Escuchar eventos de redimensionamiento de la ventana y ajustar el juego en consecuencia
window.addEventListener('resize', () => {
    // Redimensionamos el juego al nuevo tamaño de la ventana
    game.scale.resize(window.innerWidth, window.innerHeight);

    // Volver a ajustar el fondo cuando se cambie el tamaño de la ventana
    this.add.image(0, 0, 'background')
        .setOrigin(0, 0)  // Empieza en la esquina superior izquierda
        .setDisplaySize(window.innerWidth, window.innerHeight); // Ajustamos el tamaño del fondo al nuevo tamaño
});
