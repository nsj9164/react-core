let pendingEffects = [];
let hookIndex = 0;

export function useEffect(callback, dependencies) {
  const currentIndex = hookIndex++;
  const oldEffect = pendingEffects[currentIndex];
  let hasChanged = true;

  if (oldEffect) {
    hasChanged = dependencies.some(
      (dep, i) => dep !== oldEffect.dependencies[i]
    );
  }

  if (hasChanged) {
    if (oldEffect?.cleanup) oldEffect.cleanup();
    const cleanup = callback();
    pendingEffects[currentIndex] = {
      callback,
      dependencies,
      cleanup,
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
    if (!effect.cleanup) {
      const cleanup = effect.callback();
      effect.cleanup = cleanup;
    }
  });
}
