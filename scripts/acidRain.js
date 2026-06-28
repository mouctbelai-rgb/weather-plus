const acidBurn = extend(StatusEffect, "acid-burn", {

    damage: 0.05,
    speedMultiplier: 0.90,
    color: Color.valueOf("a9d800")
});
acidBurn.localizedName = "acid burn";
const acidRain = extend(ParticleWeather, "acid-rain", {});
density: 500,
sizeMin: 2.0,
sizeMax: 4.0
acidRain.color = Color.valueOf("39ff14");
acidRain.noiseColor = Color.valueOf("113e11");
acidRain.particleRegion = "particle";
acidRain.drawNoise = true;
acidRain.opacityMultiplier = 0.60;
acidRain.duration = 3600;
acidRain.chance = 0.04;
acidRain.localizedName = "Acid downpour";

acidRain.status = acidBurn;
acidRain.statusDuration = 240;
acidRain.statusAir = true;
acidRain.statusGround = true;

module.exports = {
    weather: acidRain,
    effect: acidBurn
};