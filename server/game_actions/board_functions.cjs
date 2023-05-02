const { createClient } = require('@supabase/supabase-js')
const SUPABASE_URL = 'https://fzlomsndqkamyrqjjzyb.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bG9tc25kcWthbXlycWpqenliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk4Njg3MzIsImV4cCI6MTk5NTQ0NDczMn0.mjcd0jLLcFFvrQpO0tver9lgh_82CEFFBEaxGq1WaKs'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const path = require('path')
const infoFunctions = require((path.join(__dirname, '/info_functions.cjs')))
const handFunctions = require((path.join(__dirname, '/hand_functions.cjs')))


//This funtion REALLY needs to be tested
async function attackplayer(attackingplayerid,targetplayerid,gameid,minionid,zoneid) {
  //an attack (on a player)can only occur when a minion in a contested zone attacks a player directly
  //zone id is either zone1, zone2, or zone3
  //first we check if its a legal attack i.e. can we pay the attack cost
  const minion = await infoFunctions.getminion(minionid) 
  const energypaid = await payenergy(attackingplayerid, gameid, minion.atk_cost)
  if (!energypaid){
    return false
  }
  zoneid = `${zoneid}_pow`
  const contestedzone = await infoFunctions.getcontestedzone(gameid)
  dmg = contestedzone[0][zoneid]
  return await damageplayer (targetplayerid,gameid,dmg)
  //const targetboard = infoFunctions.getplayerboard(targetplayerid, gameid)
}

async function attackzone(attackingplayerid,gameid,attackingminionid,homezone,targetzone){
  //targetzone is either zone1, zone2, zone3
  //homezone is either homezone is either minion1, minion2, minion3 
  //add support for homezone: zone1, zone2, or zone3
  zoneminid = `${targetzone}_minid`
  homeregion = homezone.substring(0, homezone.length - 1)//minion or zone
  zonenumber = (homezone.substring(homezone.length - 1)) //1,2,or 3
  const minion = await infoFunctions.getminion(attackingminionid)
  const energypaid = await payenergy(attackingplayerid, gameid, minion.atk_cost)
  if (!energypaid){
    return false
  }
  contestedzone = await infoFunctions.getcontestedzone(gameid)
  //console.log(`contestedzone ${JSON.stringify(contestedzone)}`)
  var occupiedzone = contestedzone[0][zoneminid]
  var moveminion = true
  zonepow = `${targetzone}_pow`//this is the one thats scuffed
  zoneowner = `zone${zonenumber}_owner`
  if (occupiedzone != null){
    //if the zone to be attacked already contains a minion, that minion takes damage equal to
    //the attacking minion's current power. Then, if the minion is destoryed, the attacking minion
    //takes the destroyed minion's place, otherwise both minions stay where they were
    var dmg
    if ( homeregion == "minion" ){
      //if the minion is in the circle, their power is found in minion.start_pow
      dmg = minion.start_pow
    } else {
      //otherwise the minion is in the contested zone already and its power is contestedzone[0][`${homezone}_pow`]
      dmg = contestedzone[0][`${homezone}_pow`]
    }
    const miniondestroyed =  await damageminion(gameid, targetzone, dmg)
    moveminion = miniondestroyed
  }

  if (moveminion){
    //remove the minion from its circle
    if (homeregion == "minion"){
      const { data, error } = await supabase
      .from('board')
      .update({ [`minion${zonenumber}`]: null})
      .match({gameid: gameid ,playerid:attackingplayerid})
      .select()
      if(error){
        console.log(error)
      }
    } else{
      //remove the minion from its contested zone

      const { data, error } = await supabase
      .from('contested_zone')
      .update({ 
        [zonepow]: null,
        [zoneowner] : null,
        [zoneminid] : null
      })
      .match({gameid: gameid })
      .select()
      if (error){
        console.log(error)
      }
    }
    //then add the minion to the new location
    const { data, error } = await supabase
      .from('contested_zone')
      .update({ 
        [zonepow]: dmg,
        [zoneowner] : attackingplayerid,
        [zoneminid] : attackingminionid
      })
      .match({gameid: gameid })
      .select()
      if (error){
        console.log(error)
      }
    return data
  }
  return false
}

async function damageminion(gameid, zoneid, dmg) {
  //damage a minion in a contested zone
  //zoneid is either zone1, zone2, zone3
  contestedzone = await infoFunctions.getcontestedzone(gameid)
  //console.log(`contestedzone ${contestedzone}`)
  zonepow = `${zoneid}_pow`
  zoneowner = `${zoneid}_owner`
  zoneminid = `${zoneid}_minid`

  if (contestedzone[0][zonepow] - dmg < 1){ //minion has a power of 0 or less and is removed
    const { data, error } = await supabase
      .from('contested_zone')
      .update({ 
        [zonepow]: null,
        [zoneowner] : null,
        [zoneminid] : null
      })
      .match({gameid: gameid })
      .select()
      if (error){
        console.log(error)
      }
    return true
  } else { // a minion is not destroyed, its power is reduced to atleast 1
    const { data, error } = await supabase
      .from('contested_zone')
      .update({ 
        [zonepow]: contestedzone[0][zonepow] - dmg,
      })
      .match({gameid: gameid })
      .select();
    if (error) {
      console.log(error)
    }
    return false
  }
}


async function placeminion(playerid, gameid, minionid, zoneid) {

  const boardPromise = infoFunctions.getplayerboard(playerid, gameid);
  const cardPromise = infoFunctions.getminion(minionid)
  const [board, card] = await Promise.all([boardPromise,cardPromise])
  const occupiedSlot =  (board[0][zoneid] != null);
  if (occupiedSlot) {
    return false;
  }
  await damageplayer(playerid,gameid,card.summon_cost)
  const {data,error} = await supabase
      .from('board')
      .update({ [zoneid]: minionid })
      .match({ playerid: playerid, gameid: gameid })
      .select();
  if (error) {
    console.log(error);
    return false;
  }
  await handFunctions.discard (playerid, gameid,card.minionid)
  return data;
}

async function placeterrain(playerid, gameid){
  const board = await infoFunctions.getplayerboard(playerid, gameid)
  const { data, error } = await supabase
    .from('board')
    .update({
      active_terrain: (board[0].active_terrain +1)
    })
    .match({ playerid: playerid, gameid: gameid })
  if (error) {
    console.log(error)
  }
  return data
}

async function payenergy(playerid, gameid, energyCost){
  const board = await infoFunctions.getplayerboard(playerid, gameid)
  if (board[0].active_terrain - energyCost < 0){
    return false
  }
  const { data, error } = await supabase
    .from('board')
    .update({
      active_terrain: (board[0].active_terrain - energyCost),
      spent_terrain : (board[0].spent_terrain + energyCost)
    })
    .match({ playerid: playerid, gameid: gameid })
    .select();
  if (error) {
    console.log(error)
  }
  return data
}


async function damageplayer (playerid,gameid,dmg) {
  const board = await infoFunctions.getplayerboard(playerid, gameid)
  const { data, error } = await supabase
    .from('board')
    .update({health: (board[0].health - dmg)})
    .match({ playerid: playerid, gameid: gameid })
    .select();
  if (error) {
    console.log(error)
  }
  //console.log(data)
  return data
}


module.exports = {
  damageplayer,
  placeterrain,
  placeminion,
  attackzone
}

