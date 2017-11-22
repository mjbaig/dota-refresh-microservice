'use strict'

const request = require('request-promise');

async function requestItemData(){
    var itemDataString = await request("http://www.dota2.com/jsfeed/itemdata");
    var itemData = JSON.parse(itemDataString).itemdata;
    var idToItemMap = mapItemToID(itemData);
    return idToItemMap;        
}

function mapItemToID(itemData){
    var idToItemMap = {}
    for(var key in itemData) {
        if (itemData.hasOwnProperty(key)){
            idToItemMap[itemData[key].id] = itemData[key];
        }
    }
    return idToItemMap;
}

async function getData(){
    var itemData = await requestItemData();
    return itemData;
}

module.exports = {getData:getData};