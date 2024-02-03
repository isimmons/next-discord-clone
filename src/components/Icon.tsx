import { SVGProps } from 'react';

type Props = {
  size: number;
  id: string;
} & SVGProps<SVGSVGElement>;

const Icon = ({ size, id, ...rest }: Props) => {
  return (
    <svg width={size} height={size} {...rest}>
      <use href={`/icons/sprite.svg#${id}`} />
    </svg>
  );
};

export default Icon;
