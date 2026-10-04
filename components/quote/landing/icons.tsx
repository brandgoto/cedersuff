import type { SVGProps } from "react";

export function TealCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="12" r="11" fill="#3ECFAA" fillOpacity="0.15" />
      <path d="m7.5 12.5 3 3 6-7" stroke="#3ECFAA" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SuccessCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden {...props}>
      <circle cx="32" cy="32" r="30" fill="#3ECFAA" fillOpacity="0.12" />
      <circle cx="32" cy="32" r="22" fill="#3ECFAA" />
      <path d="m22.5 32.5 6.5 6.5 13-14" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
