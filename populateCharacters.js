const { default: axios } = require('axios');
const Parse = require('parse/node');

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'D5oj2d9hl14GgupWVJ2S9vJbsMLfSchlwhXbfi25', // This is your Application ID
  'ZHUJ5gAfln75SjPJML7V7jf3Tfi6VKRCJhQs85Ip', // This is your Javascript key
  'gaehOoahjNe7e9eJ7UKF23p1NGKCiUjdoRl1iaCJ' // This is your Master key (never use it in the frontend)
);

const apiKey = '4abfb8275cec74ee41d574f4bee9295e'
const ts = 1613334311
const hash = '58902db261fce4fddf37b217d2bee884'

async function populate(characterTest){
    let character = await getCharacter(characterTest.id)

    let characterFormated = formatCharacter(character)

    let result = await saveCharacter(characterFormated, characterTest.alboName)
} 

async function saveCharacter(character, alboName){
    const Character = Parse.Object.extend('Character')
    const query = new Parse.Query(Character)
    query.equalTo("idMarvel", character.id)

    let found = await query.first()

    if(!found){
        const Character = Parse.Object.extend('Character')
        const myNewObject = new Character()
        myNewObject.set('idMarvel', character.id)
        myNewObject.set('name', character.name)
        myNewObject.set('shared', character.shared)
        myNewObject.set('lastSync', character.lastSync)
        myNewObject.set('creators', character.creators)
        myNewObject.set('alboName', alboName)

        return await myNewObject.save()
    }else{
        found.set('name', character.name)
        found.set('shared', character.shared)
        found.set('lastSync', character.lastSync)
        found.set('creators', character.creators)
        found.set('alboName', alboName)
        return found.save()
    }
}

async function getCharacter(id){
    const url = `https://gateway.marvel.com/v1/public/characters/${id}`
    const resultCharacter = await axios.get(url,{
        params:{
            apikey: apiKey,
            ts: ts,
            hash: hash,
            limit: 100,
        }
    }).catch(e => console.log(e))

    const comics = await getComics(id)
    let character = resultCharacter.data.data.results[0]
    character.allComics = comics
    return character
}

async function getComicsInRange(id, beginIndex){
    const url = `https://gateway.marvel.com/v1/public/characters/${id}/comics`
    const result = await axios.get(url,{
        params:{
            apikey: apiKey,
            ts: ts,
            hash: hash,
            limit: 100,
            offset: beginIndex
        }
    }).catch(e => console.log(e))
    return result.data.data
}

async function getComics(id){
    let allComics = []
    let offSet = 0
    let total = 0
    let query = {}
    while(offSet <= total){
        query = await getComicsInRange(id, offSet)

        allComics = allComics.concat(query.results)
        
        total = query.total
        offSet= offSet+100
        console.log(offSet, total, query.results.length, allComics.length)
    }

    return allComics
}

function cleanName(name){
    name = name.split('.').join('')
    name = name.split('$').join('')
    
    return name
}

function getRelations(character){
    let creators = {}
    let sharedAppearancesCharacters = {}
    character.allComics.forEach(comic => {

        let found = []
        //creator
        comic.creators.items.forEach(creator => {
            let creatorRolCleaned = cleanName(creator.role)
            found = creators[creatorRolCleaned]
            if(found){
                if(!found.includes(creator.name)){
                    found.push(creator.name)
                }
            }else{
                found = [creator.name]
            }
            creators[creatorRolCleaned] = found
        })


        //shared
        found = []
        comic.characters.items.forEach( sharedCharacter => {
            if(character.name !== sharedCharacter.name){
                let cleanedName = cleanName(sharedCharacter.name)
                found = sharedAppearancesCharacters[cleanedName]
                if(found){
                    found.push(comic.title)
                }else{
                    found = [comic.title]
                }
                sharedAppearancesCharacters[cleanedName] = found
                found = []
            }
        })
    });

    return {creators,sharedAppearancesCharacters}
}

function formatCharacter(character){
    
    let relations = getRelations(character)

    return { 
        id: character.id, 
        name: character.name, 
        shared: relations.sharedAppearancesCharacters,  
        creators: relations.creators,
        lastSync: new Date()
    }
}

const test = [
    {id: 1009368, alboName: 'ironman'},
    {id: 1009220, alboName: 'capamerica'},
    {id: 1009610, alboName: 'spiderman'},
]

test.forEach(async item  => {
    await populate(item)
})