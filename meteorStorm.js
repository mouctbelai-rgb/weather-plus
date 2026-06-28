const meteorStun = extend(StatusEffect, "meteor-stun", {
    speedMultiplier: 0.20,
    reloadMultiplier: 0.60,
    color: Color.valueOf("ff6a00")
});
meteorStun.localizedName = "contusion";

const meteorStorm = extend(ParticleWeather, "meteor-storm", {
    color: Color.valueOf("ff3c00"),
    noiseColor: Color.valueOf("3a1000"),
    particleRegion: "particle",
    sizeMin: 1,
    sizeMax: 2,
    density: 500,
    drawNoise: true,
    opacityMultiplier: 0.65,
    duration: 3600,
    chance: 0.02
});

meteorStorm.localizedName = "Meteor shower";
meteorStorm.status = meteorStun;
meteorStorm.statusDuration = 180;
meteorStorm.statusAir = true;
meteorStorm.statusGround = true;

meteorStorm.status = StatusEffects.none;

Events.on(ClientLoadEvent, () => {

    Timer.schedule(function() {
        if (!Vars.state.isPlaying() || Vars.net.client()) return;

        if (meteorStorm.isActive()) {
            let targets = [];

            Groups.build.each(building => {
                if (building.team == Vars.player.team()) targets.push(building);
            });

            if (targets.length > 0) {
                let target = targets[Math.floor(Math.random() * targets.length)];
                let offsetX = (Math.random() - 0.5) * 180;
                let offsetY = (Math.random() - 0.5) * 180;
                let hitX = target.x + offsetX;
                let hitY = target.y + offsetY;

                let nearCore = false;
                let teamData = Vars.state.teams.get(Vars.player.team());
                if (teamData != null && teamData.cores != null) {
                    teamData.cores.each(core => {
                        if (core.dst(hitX, hitY) < 160) nearCore = true;
                    });
                }

                if (nearCore) return;

                Bullets.fireball.create(null, Team.crux, hitX - 200, hitY + 200, -45, 35.0, 1.5);
                Damage.damage(Team.crux, hitX, hitY, 32, 150);

                Groups.unit.each(unit => {
                    if (unit.dst(hitX, hitY) < 32) unit.apply(meteorStun, 300);
                });
            }
        }
    }, 0, 0.5); 

    Log.info("Жаль не ториевые реакторы(");
});

module.exports = {
    weather: meteorStorm,
    effect: meteorStun
};
