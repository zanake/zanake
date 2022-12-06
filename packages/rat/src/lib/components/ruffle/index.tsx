import { attributes } from "../attributes";
import { SVGProps, createElement } from "react";
import {icons, FeatherIcon, FeatherIconNames} from "feather-icons";

export interface IRatFeatherProps extends SVGProps<SVGSVGElement> {
  name: FeatherIconNames
}

const Ruffle = ({name, ...props}: IRatFeatherProps) => {
    const icon : FeatherIcon = icons[name];

    const attrs = Object
        .entries(icon.attrs)
        .reduce((obj, pair) => {
            const val = pair[1];
            const key =  [attributes[pair[0] as keyof typeof attributes] || pair[0]];

            return {...obj, [key as any | string]: val}
        }, {});

    return createElement("svg", {...attrs, ...props, dangerouslySetInnerHTML: {__html: icon.contents}}, null);
}

export default Ruffle;
