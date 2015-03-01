'use strict';

require('core-js');

jest.autoMockOff();

import Parser from '../src/parser';

describe('Parser', function() {
    it('should transform simple declarations to an object', function () {
        const styles = `
            foo {
                background: #000000;
            }
        `;

        expect(Parser(styles)).toEqual({
            'foo': {
                'background': '#000000'
            }
        });
    });

    it('should transform nested rules to a nested object', function () {
        const styles = `
            foo {
                background: #000000;

                bar {
                    background: #333333;
                }
            }
        `;

        expect(Parser(styles)).toEqual({
            'foo': {
                'background': '#000000',
                'bar': {
                    'background': '#333333'
                }
            }
        });
    });

    it('should warn a user when they forget to add semicolons to finish property definitions', function () {
        const styles = `
            foo {
                background: #000000
            }
        `;

        expect(() => Parser(styles)).toThrow('Invariant Violation: Property definitions should end with a semicolon');
    });

    it('should warn a user when they forget to separate properties by a colon', function () {
        const styles = `
            foo {
                background #000000;
            }
        `;

        expect(() => Parser(styles)).toThrow('Invariant Violation: Property definitions should be separated by a colon');
    });
});