export function handleEvent(event) {
  let eventType = event.type;
  let target = event.target;

  // change 이벤트를 input으로 변환
  if (target.tagName === "INPUT" && eventType === "change") {
    eventType = "input";
  }

  while (target) {
    const handler = target.vdom?.events?.[eventType];
    if (handler) {
      handler(event);
      break;
    }
    target = target.parentNode;
  }
}

// 이벤트 위임 초기화
export function initEventDelegation() {
  ["click", "input", "change"].forEach((eventType) => {
    document.addEventListener(eventType, handleEvent);
  });
}
