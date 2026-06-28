const emiShock = extend(StatusEffect, "emi-shock", {});
emiShock.speedMultiplier = 0.0;
emiShock.reloadMultiplier = 0.00;
emiShock.color = Color.valueOf("00f0ff");
emiShock.localizedName = "EMP shock";

const ionStorm = extend(ParticleWeather, "ion-storm", {});
ionStorm.particleRegion = "particle";
ionStorm.color = Color.valueOf("00bfff");
ionStorm.noiseColor = Color.valueOf("001f3f");
ionStorm.sizeMin = 1;
ionStorm.sizeMax = 3;
ionStorm.density = 100;
ionStorm.drawNoise = true;
ionStorm.opacityMultiplier = 0.70;
ionStorm.duration = 12000;
ionStorm.chance = 0.03;
ionStorm.localizedName = "Ion storm";

let strikeTimer = 0;

Events.on(ClientLoadEvent, () => {

    Timer.schedule(function() {
        if (Vars.state.isPlaying() && !Vars.net.client() && ionStorm.isActive()) {

            let targets = [];
            Groups.build.each(building => {
                if (building != null && building.team == Vars.player.team() && building.block != null) {
                    if (building.block.hasPower) {
                        targets.push(building);
                    }
                }
            });

            if (targets.length > 0 && Math.random() < 0.50) {
                let target = targets[Math.floor(Math.random() * targets.length)];

                let strikeAngle = Math.random() * 360;

                if (Blocks.arc != null && Blocks.arc.shootType != null) {
                    for (let i = 0; i < 4; i++) {
                        Blocks.arc.shootType.create(
                            null,
                            Team.crux,
                            target.x, target.y,
                            strikeAngle,
                            3.5,
                            1.0
                        );
                    }
                }

                target.damage(150);

                Groups.unit.each(unit => {
                    if (unit.dst(target.x, target.y) < 64) {
                        unit.apply(emiShock, 240);
                    }
                });
            }
        }
    }, 0, 0.6); 

    Log.info("шадахар");
});

module.exports = {
    weather: ionStorm,
    effect: emiShock
};
