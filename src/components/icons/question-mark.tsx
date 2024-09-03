import { SVGProps } from 'react';

function QuestionMarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.25 21C5.25 29.6985 12.3015 36.75 21 36.75C29.6985 36.75 36.75 29.6985 36.75 21C36.75 12.3015 29.6985 5.25 21 5.25C12.3015 5.25 5.25 12.3015 5.25 21Z"
        fill="currentFill"
      />
      <path
        d="M20.1425 29.75H20.125M16.625 19.25V18.375C16.625 15.9588 18.5838 14 21 14H21.307C23.5537 14 25.375 15.8213 25.375 18.068V18.233C25.375 19.8854 24.3176 21.3525 22.75 21.875C21.1824 22.3975 20.125 23.8646 20.125 25.517V26.25M21 36.75C12.3015 36.75 5.25 29.6985 5.25 21C5.25 12.3015 12.3015 5.25 21 5.25C29.6985 5.25 36.75 12.3015 36.75 21C36.75 29.6985 29.6985 36.75 21 36.75Z"
        stroke="currentStroke"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default QuestionMarkIcon;
