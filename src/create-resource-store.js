import createSchema from './utils/create-schema';
import getGroup from './get-group';
import getResources from './get-resources';
import update from './update';
import remove from './remove';
import { exists, isFunction } from './utils/identification';
import { warning } from './utils/warning';

export default function createResourceStore(initialState = {}, options = {}) {
  const schemaInputs = options.schemas;
  let schemas = {};

  for (let resourceType in schemaInputs) {
    const schema = schemaInputs[resourceType];

    schemas[resourceType] = createSchema(schema);
  }

  // TEST: make sure that invalid initial states are warn'd
  let currentState = {
    resources: initialState ? initialState.resources : {},
    groups: initialState ? initialState.groups : {},
  };

  let groupeners = [];

  function getState() {
    return currentState;
  }

  function subscribe(groupener) {
    if (!isFunction(groupener)) {
      if (process.env.NODE_ENV !== 'production') {
        warning(
          `You passed an invalid groupener to store.subscribe.` +
            ` Groupeners must be functions.`,
          'LISTENER_INVALID_TYPE',
          'error'
        );
      }
    } else {
      groupeners.push(groupener);
    }

    let subscribed = true;

    return function unsubscribe() {
      if (!subscribed) {
        return;
      }

      subscribed = false;

      const index = groupeners.indexOf(groupener);
      groupeners.splice(index, 1);
    };
  }

  function onUpdate() {
    for (let i = 0; i < groupeners.length; i++) {
      const groupener = groupeners[i];
      groupener();
    }
  }

  return {
    getState,
    subscribe,
    getGroup(groupName, options) {
      return getGroup({
        groupName,
        options,
        state: currentState,
        schemas,
      });
    },
    getResources(resourceType, filter, options) {
      return getResources({
        resourceType,
        filter,
        options,
        state: currentState,
        schemas,
      });
    },
    update(path, changes) {
      currentState = update({
        state: currentState,
        schemas,
        path,
        changes,
        options,
      });

      onUpdate();
    },
    remove(path, changes) {
      // A `null` leaf within `changes` maps to removing the thing.
      //
      // remove('groups.favorites')   <== this will delete the group (in other words, it is defaulting `changes` to null)
      // remove('groups.favorites', undefined) <== this will not delete the group
      //
      // This system is powered by looking at the arguments length
      const defaultToNull = arguments.length === 1;

      if (defaultToNull && !exists(changes)) {
        changes = null;
      }

      currentState = remove({
        state: currentState,
        schemas,
        path,
        changes,
      });

      onUpdate();
    },
  };
}
