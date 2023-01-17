import { render } from '@testing-library/react';

import Resource from './resource';

describe('Mavu', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Resource />);
        expect(baseElement).toBeTruthy();
    });
});
