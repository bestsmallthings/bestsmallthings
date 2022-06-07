      export function configUpdateBestSmallThings(
        sizeFn,
        onBestSmallThingAddedFn,
        onBestSmallThingsImprovedFn
      ) {
        size = sizeFn;
        onBestSmallThingAdded = onBestSmallThingAddedFn;
        onBestSmallThingsImproved = onBestSmallThingsImprovedFn;
        lowestBadness = Infinity;
        bestSmallThings = [];    
      }

      /**
       * @param thing {any}
       * @badness {number}
       */
      export function updateBestSmallThings(thing, badness) {
        if (bestSmallThings.length == 0) {
            bestSmallThingCommonSize = size(thing);
            addToBestSmallThings();
            return;
        }
        if (badness > lowestBadness) {
          return;
        }
        if(badness < lowestBadness) {
          lowestBadness = badness;
          bestSmallThingCommonSize = size(thing);    
          improveBestSmallThings(thing, badness);
          return;
        }
        const sizeOfThing = size(thing);
        if (sizeOfThing < bestSmallThingCommonSize) {
          bestSmallThingCommonSize = sizeOfThing;    
          improveBestSmallThings(thing, badness);
          return;
        }
        if (sizeOfThing === sizeOfBestSmallThing)
          addToBestSmallThings();
        }
      }

      export let lowestBadness = Infinity;
      export let bestSmallThings = [];
      let bestSmallThingCommonSize;
      let size;
      let onBestSmallThingAdded;
      let onBestSmallThingsImproved;

      function addToBestSmallThings(thing) {
          bestSmallThings.push(thing);
          onBestSmallThingAdded();
      }

      function improveBestSmallThings(thing, badness) {
          bestSmallThings = [thing];
          onBestSmallThingsImproved();
      }
