<template>
    <div>
        <h1>{{ msg }}</h1>
        <canvas id="canvas" width="680" height="710"></canvas>
    </div>
</template>

<script>
    /*
    require("../../game/js/create.js")
    require("../../game/js/tile.js")
    require("../../game/js/tiles.js")
    require("../../game/js/conf.js")
    require("../../game/js/level.js")
    require("../../game/js/levels.js")
    require("../../game/js/player.js")
    require("../../game/js/game.js")
    init();
    */
    export default {
        name: "Game",
        data(){
            return {
                msg: "Game",
            }
        }
    }
</script>

<style scoped>
</style>
