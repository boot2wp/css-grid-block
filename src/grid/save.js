/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { GridStyle } from './components/GridStyle';

export default function save( { attributes } ) {
	return (
		<div
			{ ...useBlockProps.save( {
				className: `${ attributes.gridName }`,
			} ) }
		>
			<GridStyle attributes={ attributes } />
			<InnerBlocks.Content />
		</div>
	);
}
