const cryoFreeze = extend(StatusEffect, "cryo-freeze", {});
cryoFreeze.speedMultiplier = 0.50;
cryoFreeze.color = Color.valueOf("73d2ff");
cryoFreeze.localizedName = "Frostbite";

const cryoStorm = extend(ParticleWeather, "cryo-storm", {});

cryoStorm.color = Color.valueOf("bbf2ff");
cryoStorm.noiseColor = Color.valueOf("bbf2ff");
cryoStorm.particleRegion = "particle";
cryoStorm.sizeMin = 3;
cryoStorm.sizeMax = 6;
cryoStorm.density = 2000;
cryoStorm.duration = 12000;
cryoStorm.chance = 0.05;
cryoStorm.localizedName = "Cryo Storm";

// Привязываем дебафф замедления
cryoStorm.status = cryoFreeze;
cryoStorm.statusDuration = 180;
cryoStorm.statusAir = true;
cryoStorm.statusGround = true;

cryoStorm.init();

let generatorsFrozen = false;

Events.on(ClientLoadEvent, () => {

    Timer.schedule(function() {
        if (!Vars.state.isPlaying() || Vars.net.client()) return;

        if (cryoStorm.isActive()) {
            generatorsFrozen = true;

            Groups.build.each(building => {
                if (building != null && building.team == Vars.player.team() && building.block != null) {
                    let name = building.block.name;

                    if (name.includes("combustion-generator") || name.includes("steam-generator") || name.includes("differential-generator")) {

                        building.enabled = false;

                        if (Math.random() < 0.5) {
                            Fx.freezing.at(building.x, building.y);
                            Fx.freezing.at(building.x, building.y);
                        }
                    }
                }
            });
        }

        else if (!cryoStorm.isActive() && generatorsFrozen) {
            generatorsFrozen = false;

            Groups.build.each(building => {
                if (building != null && building.team == Vars.player.team() && building.block != null) {
                    let name = building.block.name;

                    if (name.includes("combustion-generator") || name.includes("steam-generator") || name.includes("differential-generator")) {
                        building.enabled = true;
                    }
                }
            });
        }
    }, 0, 1.0);
});

module.exports = {
    weather: cryoStorm,
    effect: cryoFreeze
};
