/**
 * @param sizeFn {(thing:any)=>number}
 * @param onBestSmallThingAddedFn {()=>void}
 * @param onBestSmallThingsImprovedFn {()=>void}
 */
export function configUpdateBestSmallThings(
  sizeFn,
  onBestSmallThingAddedFn,
  onBestSmallThingsImprovedFn
) {
  size = sizeFn;
  onBestSmallThingAdded = onBestSmallThingAddedFn;
  onBestSmallThingsImproved = onBestSmallThingsImprovedFn;
  lowestBadness = Infinity;
  assert(!dbgAlreadyInited);
  dbgAlreadyInited = true;
  bestSmallThings = [];
  bestSmallThingsCommonSize = -1;
  updateBestSmallThings = updateBestSmallThings1;
}

function assert(x){if(!x)throw new Error('assertion failed');}

let dbgAlreadyInited = false;

/**
 * @param thing {any}
 * @param badness {number}
 */
function updateBestSmallThings1(thing, badness) {
  assert(dbgAlreadyInited);
  assert (bestSmallThings.length == 0);
  bestSmallThingsCommonSize = size(thing);
  lowestBadness = badness;
  addToBestSmallThings(thing);
  updateBestSmallThings = updateBestSmallThings2;
}

function updateBestSmallThings2(thing, badness) {
  assert(dbgAlreadyInited);
  if (badness > lowestBadness) {
    return;
  }
  const sizeOfThing = size(thing);
  if (badness < lowestBadness) {
    lowestBadness = badness;
    improveBestSmallThings(thing, sizeOfThing);
    return;
  }
  if (sizeOfThing < bestSmallThingsCommonSize) {
    improveBestSmallThings(thing, sizeOfThing);
    return;
  }
  if (sizeOfThing === bestSmallThingsCommonSize) {
    addToBestSmallThings(thing);
  }
}

export let updateBestSmallThings = updateBestSmallThings1;
export let lowestBadness = Infinity;

/**
 * @type any[]
 */
export let bestSmallThings = [];

export let bestSmallThingsCommonSize = -1;
let size;
let onBestSmallThingAdded;
let onBestSmallThingsImproved;

function addToBestSmallThings(thing) {
  bestSmallThings.push(thing);
  onBestSmallThingAdded();
}

function improveBestSmallThings(thing, sizeOfThing) {
  bestSmallThingsCommonSize = sizeOfThing;
  bestSmallThings = [thing];
  onBestSmallThingsImproved();
}
