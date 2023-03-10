import { SVGProps } from 'react';
import { HTMLAttributeNames } from '../typings';
import { icons, FeatherIcon, FeatherIconNames } from 'feather-icons';
import htmlJsxAttributeMapping from '../assets/html-jsx-attribute-mapping.json';

export interface IFeatherIconProps extends SVGProps<SVGSVGElement> {
    name: FeatherIconNames;
}

const Feather = ({ name, ...props }: IFeatherIconProps) => {
    const icon: FeatherIcon = icons[name];

    const attrs = Object.entries(icon.attrs).reduce((obj, pair) => {
        const val = pair[1];
        const key = [htmlJsxAttributeMapping[pair[0] as HTMLAttributeNames] || pair[0]];

        return { ...obj, [key as any | string]: val };
    }, {});

    return <svg {...{ ...attrs, ...props }} dangerouslySetInnerHTML={{ __html: icon.contents }} />;
};

export default Feather;
