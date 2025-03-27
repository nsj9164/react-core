let stateStore = [];
let stateIndex = 0;
let rerenderCallback = null;

export function useState(initialValue) {
  const currentIndex = stateIndex;

  if (stateStore[currentIndex] === undefined) {
    stateStore[currentIndex] = initialValue;
  }

  const setState = (newValue) => {
    const prevValue = stateStore[currentIndex];
    const nextValue =
      typeof newValue === "function" ? newValue(prevValue) : newValue;

    if (prevValue !== nextValue) {
      stateStore[currentIndex] = nextValue;
      rerenderCallback();
    }
  };

  stateIndex++;

  return [stateStore[currentIndex], setState];
}

// setState될 때 실행할 리렌더 함수
export function injectRerender(callback) {
  rerenderCallback = callback;
}

// stateIndex 초기화
export function resetStateIndex() {
  stateIndex = 0;
}
