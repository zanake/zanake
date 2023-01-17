import { attributes } from './attributes';
import { SVGProps, createElement } from 'react';
import { icons, FeatherIcon, FeatherIconNames } from 'feather-icons';

export interface ScalesProps extends SVGProps<SVGSVGElement> {
    name?: FeatherIconNames;
}

const Scales = ({ name = 'feather', ...props }: ScalesProps) => {
    const icon: FeatherIcon = icons[name] || icons['feather'];

    const attrs = Object.entries(icon.attrs).reduce((obj, pair) => {
        const val = pair[1];
        const key = [attributes[pair[0] as keyof typeof attributes] || pair[0]];

        return { ...obj, [key as any | string]: val };
    }, {});

    return createElement('svg', { ...attrs, ...props, dangerouslySetInnerHTML: { __html: icon.contents } }, null);
};

export default Scales;
