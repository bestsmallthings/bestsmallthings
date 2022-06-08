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
        bestSmallThingCommonSize = -1;
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
        bestSmallThingCommonSize = size(thing);
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
          improveBestSmallThings(thing, badness, sizeOfThing);
          return;
        }
        if (sizeOfThing < bestSmallThingCommonSize) {
          improveBestSmallThings(thing, badness, sizeOfThing);
          return;
        }
        if (sizeOfThing === bestSmallThingCommonSize) {
          addToBestSmallThings(thing);
        }
      }

      export let updateBestSmallThings = updateBestSmallThings1;
      export let lowestBadness = Infinity;
      export let bestSmallThings = [];
      export let bestSmallThingCommonSize = -1;
      let size;
      let onBestSmallThingAdded;
      let onBestSmallThingsImproved;

      function addToBestSmallThings(thing) {
          bestSmallThings.push(thing);
          onBestSmallThingAdded();
      }

      function improveBestSmallThings(thing, badness, sizeOfThing) {
          bestSmallThingCommonSize = sizeOfThing;   
          bestSmallThings = [thing];
          onBestSmallThingsImproved();
      }
