import { SVGProps } from 'react';
import { HTMLAttributeNames, HTML_JSX_ATTRIBUTE_MAPPING } from '.';
import { icons, FeatherIcon, FeatherIconNames } from 'feather-icons';

export interface IFeatherIconProps extends SVGProps<SVGSVGElement> {
    name: FeatherIconNames;
}

export const Feather = ({ name, ...props }: IFeatherIconProps) => {
    const icon: FeatherIcon = icons[name];

    const attrs = Object.entries(icon.attrs).reduce((obj, pair) => {
        const val = pair[1];
        const key = [HTML_JSX_ATTRIBUTE_MAPPING[pair[0] as HTMLAttributeNames] || pair[0]];

        return { ...obj, [key as any | string]: val };
    }, {});

    return <svg {...{ ...attrs, ...props }} dangerouslySetInnerHTML={{ __html: icon.contents }} />;
};
