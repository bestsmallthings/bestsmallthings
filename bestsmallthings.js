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
        bestSmallThingCommonSize = -1;
        updateBestSmallThings = updateBestSmallThings1;    
      }

      /**
       * @param thing {any}
       * @badness {number}
       */
      function updateBestSmallThings1(thing, badness) {
        if (bestSmallThings.length != 0) {
            throw new Error('internal state error!');  
        }
        bestSmallThingCommonSize = size(thing);
        lowestBadness = badness;
        addToBestSmallThings();
        updateBestSmallThings = updateBestSmallThings2;
      }

      function updateBestSmallThings2() {
        if (badness > lowestBadness) {
          return;
        }
        const sizeOfThing = size(thing);    
        if(badness < lowestBadness) {
          lowestBadness = badness;
          improveBestSmallThings(thing, badness, sizeOfThing);
          return;
        }
        if (sizeOfThing < bestSmallThingCommonSize) {
          improveBestSmallThings(thing, badness, sizeOfThing);
          return;
        }
        if (sizeOfThing === sizeOfBestSmallThing)
          addToBestSmallThings();
        }
      }

      export let lowestBadness = Infinity;
      export let bestSmallThings = [];
      let bestSmallThingCommonSize = -1;
      let size;
      let onBestSmallThingAdded;
      let onBestSmallThingsImproved;
      let updateBestSmallThings = updateBestSmallThings1;

      function addToBestSmallThings(thing) {
          bestSmallThings.push(thing);
          onBestSmallThingAdded();
      }

      function improveBestSmallThings(thing, badness, sizeOfThing) {
          bestSmallThingCommonSize = sizeOfThing;   
          bestSmallThings = [thing];
          onBestSmallThingsImproved();
      }
