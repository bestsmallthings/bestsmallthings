/**
 * @param {()=>Promise<void>} onBestSmallThingAddedFn
 * @param {()=>Promise<void>} onBestSmallThingsImprovedFn
 * @param {(x:any,y:any)=>boolean} isXBetterThanYFn must judge in terms of
 * smallness also
 */
export function configUpdateBestSmallThings(
  onBestSmallThingAddedFn,
  onBestSmallThingsImprovedFn,
  isXBetterThanYFn
) {
  onBestSmallThingAdded = onBestSmallThingAddedFn;
  onBestSmallThingsImproved = onBestSmallThingsImprovedFn;
  isXBetterThanY = isXBetterThanYFn;
  lowestBadness = null;
  assert(!dbgAlreadyInited);
  dbgAlreadyInited = true;
  bestSmallThings = [];
  updateBestSmallThings = updateBestSmallThingsWhenNoneFoundSoFar;
}

/**
 * @param thing {any}
 * @param badness {any}
 */
async function updateBestSmallThingsWhenNoneFoundSoFar(thing, badness) {
  assert(dbgAlreadyInited);
  assert(bestSmallThings.length == 0);
  lowestBadness = badness;
  await addToBestSmallThings(thing);
  updateBestSmallThings = updateBestSmallThingsWhenSomeAlreadyFound;
}

/**
 * @param {any} thing
 * @param {any} badness
 */
async function updateBestSmallThingsWhenSomeAlreadyFound(thing, badness) {
  assert(dbgAlreadyInited);
  if (lowestBadness == null) {
    assert(false);
    return;
  }
  if (isXBetterThanY(lowestBadness, badness)) {
    return;
  }

  if (isXBetterThanY(badness, lowestBadness)) {
    lowestBadness = badness;
    await improveBestSmallThings(thing);
    return;
  }

  await addToBestSmallThings(thing);
}

export let updateBestSmallThings = updateBestSmallThingsWhenNoneFoundSoFar;

/** @type {any} */
export let lowestBadness = null;

/** @type any[] */
export let bestSmallThings = [];

/** @type {() => Promise<void>} */
let onBestSmallThingAdded;

/** @type {() => Promise<void>} */
let onBestSmallThingsImproved;

/** @type {(x:any,y:any)=>boolean} */
let isXBetterThanY;

/** @param {any} thing */
async function addToBestSmallThings(thing) {
  bestSmallThings.push(thing);
  if (bestSmallThings.length == 1) {
    await onBestSmallThingsImproved();
  }
  await onBestSmallThingAdded();
}

/** @param {any} thing */
async function improveBestSmallThings(thing) {
  bestSmallThings = [thing];
  await onBestSmallThingsImproved();
}

/** @param {boolean} x */
function assert(x) {
  if (!x) {
    debugger;
    throw new Error("assertion failed");
  }
}

let dbgAlreadyInited = false;
