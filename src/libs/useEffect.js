let pendingEffects = [];
let hookIndex = 0;

export function useEffect(callback, dependencies) {
  const currentIndex = hookIndex++;
  const oldEffect = pendingEffects[pendingEffects.length - 1];
  let hasChanged = true;

  if (oldEffect) {
    hasChanged = dependencies.some(
      (dep, i) => dep !== oldEffect.dependencies[i]
    );
  }

  if (hasChanged) {
    pendingEffects[currentIndex] = {
      callback,
      dependencies,
      cleanup: oldEffect?.cleanup || null,
    };
  } else {
    pendingEffects[currentIndex] = oldEffect;
  }
}

export function resetHookIndex() {
  hookIndex = 0;
}

export function runEffects() {
  pendingEffects.forEach((effect) => {
    if (effect.cleanup) {
      effect.cleanup();
    }

    const cleanup = effect.callback();
    effect.cleanup = cleanup;
  });
}
