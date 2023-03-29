import { useEffect, useRef } from "react";

export const useScroll = () => {
  const element = useRef<any>(null);

  useEffect(() => {
    if (element) {
      element.current.addEventListener(
        "DOMNodeInserted",
        (event: { currentTarget: any }) => {
          const { currentTarget: target } = event;
          target.scroll({ top: target.scrollHeight, behavior: "auto" });
        }
      );
    }
  }, []);

  return { element };
};
