import { render } from '@testing-library/react';

import Scales from './scales';

describe('ReactScales', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Scales />);
        expect(baseElement).toBeTruthy();
    });
});
