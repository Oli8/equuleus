<template>
    <div>
        <h1>{{ msg }}</h1>
        <canvas id="canvas" width="680" height="710"></canvas>
    </div>
</template>

<script>
    this.createjs = {};
    window.createjs = this.createjs;
    require('createjs');

    //import Tile from '../../game/js/tile.js'
    import tiles from '../../game/js/tiles.js'
    import * as conf from '../../game/js/conf.js'
    //init();
    export default {
        name: "Game",
        data(){
            return {
                msg: "Game",
            }
        },
        mounted(){
            console.log(tiles);
        },
    }
</script>

<style scoped>
    body {
        background-color: lightgrey;
        text-align: center;
    }

    canvas {
        background-image: url(../../game/img/medievalTile_13.png);
        border: 1px solid #000;
    }
</style>
