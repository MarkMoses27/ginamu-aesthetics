import { Fragment } from "react";

/** Keep semantic text and natural line wrapping while revealing whole words. */
export default function MotionWords({ children }: { children: string }) {
  return children.split(/(\s+)/).map((part, index) =>
    /^\s+$/.test(part) ? <Fragment key={index}>{part}</Fragment> : (
      <span className="motionWordClip" key={index}><span className="motionWord">{part}</span></span>
    )
  );
}
