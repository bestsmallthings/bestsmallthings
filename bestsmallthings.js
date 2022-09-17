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

/**
 * @param {boolean} x
 */
function assert(x){if(!x)throw new Error('assertion failed');}

let dbgAlreadyInited = false;

/**
 * @param thing {any}
 * @param badness {number}
 */
async function updateBestSmallThings1(thing, badness) {
  assert(dbgAlreadyInited);
  assert (bestSmallThings.length == 0);
  bestSmallThingsCommonSize = size(thing);
  lowestBadness = badness;
  await addToBestSmallThings(thing);
  updateBestSmallThings = updateBestSmallThings2;
}

/**
 * @param {any} thing
 * @param {number} badness
 */
async function updateBestSmallThings2(thing, badness) {
  assert(dbgAlreadyInited);
  if (badness > lowestBadness) {
    return;
  }
  const sizeOfThing = size(thing);
  if (badness < lowestBadness) {
    lowestBadness = badness;
    await improveBestSmallThings(thing, sizeOfThing);
    return;
  }
  if (sizeOfThing < bestSmallThingsCommonSize) {
    await improveBestSmallThings(thing, sizeOfThing);
    return;
  }
  if (sizeOfThing === bestSmallThingsCommonSize) {
    await addToBestSmallThings(thing);
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

/**
 * @param {any} thing
 */
async function addToBestSmallThings(thing) {
  bestSmallThings.push(thing);
  await onBestSmallThingAdded();
}

/**
 * @param {any} thing
 * @param {number} sizeOfThing
 */
async function improveBestSmallThings(thing, sizeOfThing) {
  bestSmallThingsCommonSize = sizeOfThing;
  bestSmallThings = [thing];
  await onBestSmallThingsImproved();
}
