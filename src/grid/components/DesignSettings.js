import { __ } from '@wordpress/i18n';
import {
	TextControl,
	Panel,
	PanelBody,
	Button,
	Flex,
	FlexItem,
	CheckboxControl,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';
import { useState } from '@wordpress/element';

import { SaveLayouts } from './SaveLayouts';

export const DesignSettings = ( { attributes, setAttributes } ) => {
	const [ savedLayoutsVisible, setSavedLayoutsVisible ] = useState( false );
	const [ moreSettingsVisible, setMoreSettingsVisible ] = useState( false );

	const toggleSavedLayoutsVisible = () => {
		setSavedLayoutsVisible( ( current ) => ! current );
	};

	const toggleMoreSettingsVisible = () => {
		setMoreSettingsVisible( ( current ) => ! current );
	};
	return (
		<>
			<Spacer paddingBottom={ 2 }>
				<Flex>
					<FlexItem>
						<Button
							variant="secondary"
							isPressed={ savedLayoutsVisible }
							onClick={ toggleSavedLayoutsVisible }
						>
							{ __( 'Manage saved layouts', 'b2wp-grid' ) }
						</Button>
					</FlexItem>
					<FlexItem>
						<Button
							icon={ moreVertical }
							isPressed={ moreSettingsVisible }
							showTooltip={ true }
							label={ __( 'Design settings', 'b2wp-grid' ) }
							onClick={ toggleMoreSettingsVisible }
						/>
					</FlexItem>
				</Flex>
			</Spacer>
			{ savedLayoutsVisible && (
				<SaveLayouts
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			) }
			{ moreSettingsVisible && (
				<>
					<Panel header={ __( 'Design Settings', 'b2wp-grid' ) }>
						<PanelBody>
							<GridName
								attributes={ attributes }
								setAttributes={ setAttributes }
							/>
							<ApplyToQueryLoop
								attributes={ attributes }
								setAttributes={ setAttributes }
							/>
							<Panels
								attributes={ attributes }
								setAttributes={ setAttributes }
							/>
						</PanelBody>
					</Panel>
				</>
			) }
		</>
	);
};

const GridName = ( { attributes, setAttributes } ) => (
	<TextControl
		label={ __( 'Grid Name', 'b2wp-grid' ) }
		help="Each grid on a post or page should have a unique name."
		value={ attributes.gridName }
		onChange={ ( val ) => setAttributes( { gridName: val } ) }
	/>
);

const ApplyToQueryLoop = ( { attributes, setAttributes } ) => (
	<CheckboxControl
		label="Apply to Query Loop block"
		help={ __(
			'Apply the css grid property to a Query Loop block inside the grid, instead of to the CSS Grid block itself.',
			'b2wp-grid'
		) }
		checked={ attributes.applyToQueryLoop }
		onChange={ ( val ) => setAttributes( { applyToQueryLoop: val } ) }
	/>
);

const Panels = ( { attributes, setAttributes } ) => {
	const enablePanels = attributes.enablePanels;

	const setChecked = ( val, panelName ) => {
		let newEnablePanels = [];

		if ( ! val ) {
			newEnablePanels = attributes.enablePanels.filter( function (
				panel
			) {
				return panel.name !== panelName;
			} );

			setAttributes( { enablePanels: newEnablePanels } );
			return;
		}

		newEnablePanels = [ ...attributes.enablePanels, { name: panelName } ];
		setAttributes( { enablePanels: newEnablePanels } );
	};

	return (
		<>
			<CheckboxControl
				label={ __( 'Layouts', 'b2wp-grid' ) }
				checked={ enablePanels.find(
					( panel ) => panel.name === 'Layouts'
				) }
				onChange={ ( val ) => setChecked( val, 'Layouts' ) }
			/>
			<CheckboxControl
				label={ __( 'Columns', 'b2wp-grid' ) }
				checked={ enablePanels.find(
					( panel ) => panel.name === 'Columns'
				) }
				onChange={ ( val ) => setChecked( val, 'Columns' ) }
			/>
			<CheckboxControl
				label={ __( 'Auto', 'b2wp-grid' ) }
				checked={ enablePanels.find(
					( panel ) => panel.name === 'Auto'
				) }
				onChange={ ( val ) => setChecked( val, 'Auto' ) }
			/>
			<CheckboxControl
				label={ __( 'Sidebars', 'b2wp-grid' ) }
				checked={ enablePanels.find(
					( panel ) => panel.name === 'Sidebars'
				) }
				onChange={ ( val ) => setChecked( val, 'Sidebars' ) }
			/>
			<CheckboxControl
				label="Areas"
				checked={ enablePanels.find(
					( panel ) => panel.name === 'Areas'
				) }
				onChange={ ( val ) => setChecked( val, 'Areas' ) }
			/>
		</>
	);
};
