import { SVGProps } from 'react';

function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="43"
      height="42"
      viewBox="0 0 43 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21.5 29.7501V24.5001M6.96511 30.3315L6.0649 19.5289C5.86845 17.1716 6.87589 14.8744 8.74313 13.4221L17.2024 6.8427C19.7302 4.87665 23.2698 4.87665 25.7976 6.8427L34.2569 13.4221C36.1241 14.8744 37.1315 17.1716 36.9351 19.5289L36.0349 30.3315C35.7325 33.9595 32.6997 36.7501 29.0591 36.7501H13.9409C10.3003 36.7501 7.26744 33.9595 6.96511 30.3315Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default HomeIcon;
