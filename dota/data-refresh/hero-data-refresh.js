'use strict'

const heroData = require('../../../resources/hero_data.json').DOTAHeroes;

function mapItemToID(){
    var idToHeroMap = {}
    for(var key in heroData) {
        if (heroData.hasOwnProperty(key)){
            idToHeroMap[heroData[key].HeroID] = heroData[key];
        }
    }
    return idToHeroMap;
}

async function getData(){
    var heroData = mapItemToID();
    return heroData;
}

module.exports = {getData:getData};