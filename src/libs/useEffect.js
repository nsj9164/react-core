const effectStack = [];

export function useEffect(callback, dependencies) {
  const oldEffect = effectStack[effectStack.length - 1];
  let hasChanged = true;

  if (oldEffect) {
    hasChanged = dependencies.some(
      (dep, i) => dep !== oldEffect.dependencies[i]
    );
  }

  if (hasChanged) {
    if (oldEffect?.cleanup) {
      oldEffect.cleanup();
    }

    const cleanup = callback();
    // effectStack[effectStack.length - 1] = { dependencies, cleanup };
    effectStack.push({ callback, dependencies, cleanup });
  }
}

function runEffects() {
  setTimeout(() => {
    effectStack.forEach((effect) => {
      if (effect.cleanup) effect.cleanup();
      effect.cleanup = effect.callback();
    });
  });
}
