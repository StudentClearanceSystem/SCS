import { memo, SVGProps } from 'react';

const CheckboxIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 23 22' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <rect y={0.5} width={23} height={21} rx={5} fill='#156082' />
    <path
      d='M5.75 10.4522L11.287 15.2L17.25 6.8'
      stroke='white'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
const Memo = memo(CheckboxIcon);
export { Memo as CheckboxIcon };
