import { SVGProps } from 'react';

function QuestionMarkIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M20.6425 29.75H20.625M17.125 19.25V18.375C17.125 15.9588 19.0838 14 21.5 14H21.807C24.0537 14 25.875 15.8213 25.875 18.068V18.233C25.875 19.8854 24.8176 21.3525 23.25 21.875C21.6824 22.3975 20.625 23.8646 20.625 25.517V26.25M21.5 36.75C12.8015 36.75 5.75 29.6985 5.75 21C5.75 12.3015 12.8015 5.25 21.5 5.25C30.1985 5.25 37.25 12.3015 37.25 21C37.25 29.6985 30.1985 36.75 21.5 36.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default QuestionMarkIcon;
