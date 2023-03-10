import { SVGProps } from 'react';
import { BootstrapIconNames } from '../typings';

export interface IBootstrapIconProps extends SVGProps<SVGSVGElement> {
    name: BootstrapIconNames;
}

const Bootstrap = ({ fill, name, width, style, height, className, ...props }: IBootstrapIconProps) => {
    const icon = `<use xlink:href="../node_modules/bootstrap-icons/bootstrap-icons.svg#${name}" />`;

    return (
        <svg
            {...props}
            fill={fill}
            style={style}
            width={width}
            height={height}
            className={`bi ${className}`}
            dangerouslySetInnerHTML={{ __html: icon }}
        />
    );
};

export default Bootstrap;
