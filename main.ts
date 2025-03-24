namespace SpriteKind {
    export const camerafollow = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, myTiles.tile14, function (sprite, location) {
    game.setGameOverMessage(true, "go farther...")
    game.setGameOverEffect(true, effects.splatter)
    game.gameOver(true)
})
scene.onOverlapTile(SpriteKind.Player, myTiles.tile13, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level5`)
    tiles.placeOnTile(camera, tiles.getTileLocation(0, 12))
    tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 12))
})
scene.onOverlapTile(SpriteKind.Player, myTiles.tile4, function (sprite, location) {
    lose()
})
scene.onOverlapTile(SpriteKind.Player, myTiles.tile5, function (sprite, location) {
    lose()
})
scene.onOverlapTile(SpriteKind.Player, myTiles.tile11, function (sprite, location) {
    lose()
})
function lose () {
    game.setGameOverPlayable(false, music.melodyPlayable(music.bigCrash), false)
    sprites.destroy(mySprite, effects.fire, 200)
    alive = 1
    timer.after(500, function () {
        game.setGameOverEffect(false, effects.dissolve)
        music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
        music.play(music.melodyPlayable(music.thump), music.PlaybackMode.InBackground)
        game.setGameOverEffect(true, effects.dissolve)
        game.setGameOverMessage(true, "You shattered...")
        game.gameOver(true)
    })
}
scene.onOverlapTile(SpriteKind.Player, myTiles.tile7, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level4`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 13))
    tiles.placeOnTile(camera, tiles.getTileLocation(0, 14))
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    lose()
})
let alive = 0
let camera: Sprite = null
let mySprite: Sprite = null
tiles.setCurrentTilemap(tilemap`level0`)
mySprite = sprites.create(assets.image`player`, SpriteKind.Player)
mySprite.setVelocity(75, 50)
tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 6))
let spin = 0
animation.runImageAnimation(
mySprite,
assets.animation`spin animation`,
50,
true
)
let mySprite2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . f . . . . . . . . 
    . . . . . . . f . . . . . . . . 
    . . . . . . f 8 f . . . . . . . 
    . . . . . . f 8 f . . . . . . . 
    . . . . . f 8 9 8 f . . . . . . 
    . . . . . f 8 9 8 f . . . . . . 
    . . . . f 8 8 8 8 8 f . . . . . 
    . . . . f f f f f f f . . . . . 
    `, SpriteKind.Enemy)
tiles.placeOnTile(mySprite2, tiles.getTileLocation(6, 8))
let mySprite3 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . f . . . . . . . . 
    . . . . . . . f . . . . . . . . 
    . . . . . . f 8 f . . . . . . . 
    . . . . . . f 8 f . . . . . . . 
    . . . . . f 8 9 8 f . . . . . . 
    . . . . . f 8 9 8 f . . . . . . 
    . . . . f 8 8 8 8 8 f . . . . . 
    . . . . f f f f f f f . . . . . 
    `, SpriteKind.Enemy)
tiles.placeOnTile(mySprite3, tiles.getTileLocation(102, 7))
game.setGameOverMessage(false, "you broke...")
game.setGameOverScoringType(game.ScoringType.HighScore)
camera = sprites.create(assets.image`camera drawing`, SpriteKind.camerafollow)
scene.cameraFollowSprite(camera)
camera.follow(mySprite, 79)
tiles.placeOnTile(camera, tiles.getTileLocation(0, 13))
camera.setFlag(SpriteFlag.GhostThroughWalls, true)
camera.setFlag(SpriteFlag.Invisible, true)
mySprite.setStayInScreen(true)
game.onUpdate(function () {
    if (!(mySprite.isHittingTile(CollisionDirection.Bottom))) {
        mySprite.ay = 400
    } else if (mySprite.isHittingTile(CollisionDirection.Right)) {
        sprites.destroy(mySprite, effects.fire, 500)
        lose()
    } else if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
    	
    }
    mySprite.vx = 61
})
game.onUpdate(function () {
    if (alive == 0) {
        info.setScore(game.runtime() / 11.56355)
    }
})
game.onUpdate(function () {
    if (controller.anyButton.isPressed() && mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy += -138
    }
})
