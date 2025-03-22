export default class Plataforms {
    constructor(scene) {
        this.scene = scene;
        // Creamos un grupo de plataformas estáticas (no se mueven, solo se usan para colisiones)
        this.plataforms = this.scene.physics.add.staticGroup();
        this.createPlataforms();  // Llamamos a la función para crear las plataformas
    }

    createPlataforms() {
        let screenWidth = window.innerWidth;  // Guardamos el ancho de la ventana
        let screenHeight = window.innerHeight;  // Guardamos el alto de la ventana

        // Creamos las plataformas en diferentes posiciones en la pantalla (de forma dinámica)
        this.plataforms.create(screenWidth * 0.3, screenHeight * 0.8, 'platform').setScale(1).refreshBody();  // Plataforma en el 10% del ancho y 80% de la altura
        this.plataforms.create(screenWidth * 0.4, screenHeight * 0.6, 'platform').setScale(1).refreshBody();  // Plataforma en el 40% del ancho y 60% de la altura
        this.plataforms.create(screenWidth * 0.7, screenHeight * 0.4, 'platform').setScale(1).refreshBody();  // Plataforma en el 70% del ancho y 40% de la altura
        this.plataforms.create(screenWidth * 0.3, screenHeight * 0.2, 'platform').setScale(1).refreshBody();  // Plataforma en el 30% del ancho y 20% de la altura
    }
}
