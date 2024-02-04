import { SVGProps } from 'react';

type Props = {
  id: string;
  size?: number;
} & SVGProps<SVGSVGElement>;

const Icon = ({ id, size = 24, ...rest }: Props) => {
  return (
    <svg width={size} height={size} {...rest}>
      <use href={`/icons/sprite.svg#${id}`} />
    </svg>
  );
};

export default Icon;
