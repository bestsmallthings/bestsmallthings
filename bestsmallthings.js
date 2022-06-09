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
        bestSmallThings = [];
        bestSmallThingsCommonSize = -1;
        updateBestSmallThings = updateBestSmallThings1;    
      }

      /**
       * @param thing {any}
       * @param badness {number}
       */
      function updateBestSmallThings1(thing, badness) {
        if (bestSmallThings.length != 0) {
            throw new Error('internal state error!');  
        }
        bestSmallThingsCommonSize = size(thing);
        lowestBadness = badness;
        addToBestSmallThings(thing);
        updateBestSmallThings = updateBestSmallThings2;
      }

      function updateBestSmallThings2(thing, badness) {
        if (badness > lowestBadness) {
          return;
        }
        const sizeOfThing = size(thing);    
        if(badness < lowestBadness) {
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
