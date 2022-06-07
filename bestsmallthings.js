      export function configUpdateBestSmallThings(
        sizeFn,
        onBestSmallThingAddedFn,
        onBestSmallThingsImprovedFn
      ) {
        size = sizeFn;
        onBestSmallThingAdded = onBestSmallThingAddedFn;
        onBestSmallThingsImproved = onBestSmallThingsImprovedFn;
      }

      /**
       * @param thing {any}
       * @badness {number}
       */
      export function updateBestSmallThings(thing, badness) {
        if (
          bestSmallThings.length == 0 ||
          (badness === lowestBadness && size(thing) == size(bestSmallThings[0]))
        ) {
          bestSmallThings.push(thing);
          onBestSmallThingAdded();
          return;
        }
        if (badness > lowestBadness) {
          return;
        }
        if (size(thing) >= size(bestSmallThings[0])) {
          return;
        }
        bestSmallThings = [thing];
        lowestBadness = badness;
        onBestSmallThingsImproved();
      }

      export let lowestBadness = Infinity;
      export let bestSmallThings = [];
      let size;
      let onBestSmallThingAdded;
      let onBestSmallThingsImproved;
