import React, {useEffect, useState} from 'react';
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { ActionWithAnyProp, MySpecialityT, SpecialityT } from 'types';
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from 'images/Icons/closeIcon';
import InfiniteLoaderBlock from 'components/inputs/InFiniteLoader';
import { SmallButton } from 'components/controls/buttons';
import { StyledAutocompleteRoot, StyledInput } from '../../common';
import './specialityBlock.scss';

type SpecialityBlockProps = {
	hasNextPage?: boolean,
	isNextPageLoading?: boolean,
	isLastPage: boolean,
	items?: [],
	getSpecialities: (arg: string | undefined) => ActionWithAnyProp,
	removeSpeciality: (arg: number[]) => ActionWithAnyProp
	specialities: SpecialityT[],
	mySpecialities: MySpecialityT[],
	setSpeciality: (arg: number) => void,
	clearToken: () => ActionWithAnyProp
};

const useStyles = makeStyles(theme => ({
	label: {
		display: "block"
	},
	listbox: {
		width: 200,
		margin: 0,
		padding: 0,
		zIndex: 1,
		listStyle: "none",
		backgroundColor: theme.palette.background.paper,
		maxHeight: 200,
		'& li[data-focus="true"]': {
			backgroundColor: "#4a8df6",
			color: "white",
			cursor: "pointer"
		},
		'& > div > li:hover': {
			cursor: "pointer"
		},
		"& li:active": {
			backgroundColor: "#2977f5",
			color: "white",
			cursor: "pointer"
		},
		'& > input': {
			'aria-controls': 'use-autocomplete-demo-popup'
		}
	}
	}));

const SpecialityBlock: React.FC<SpecialityBlockProps> = ({
		getSpecialities,
		removeSpeciality,
		clearToken,
		specialities,
		mySpecialities,
		isLastPage,
		setSpeciality
	}: SpecialityBlockProps
) => {
	const classes = useStyles();
	// const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;
	const [items, setItems] = useState<any[]>([]);
	const [currentSpecialities, setCurrentSpecialities] = useState<MySpecialityT[]>([]);
	const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
	const [hasNextPage, setHasNextPage] = useState<boolean>(false);
	const [search, setSearch] = useState<string>('');

	const loadNextPage = async (...args: any) => {
		try{
			getSpecialities(undefined);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setCurrentSpecialities(mySpecialities);
		setSearch('');
	}, [mySpecialities.length])

	useEffect(() => {
		setItems(specialities)
		setIsNextPageLoading(false);
	}, [specialities]);

	useEffect(() => {
		setHasNextPage(!isLastPage);
	}, [isLastPage])

	useEffect(() => {
		clearToken();
		getSpecialities(search);
	}, [search]);

	const {
		getRootProps,
		getInputProps,
		getListboxProps,
		getOptionProps,
		groupedOptions,
		focused
	} = useAutocomplete({
		id: "use-autocomplete-demo",
		options: items,
		getOptionLabel: option => option.name
	});
	
	useEffect(() => {
		if (items.length === 0) {
			loadNextPage();
		}
	}, [items]);
	const inputProps = Object.assign({}, {...getInputProps()});
	return (
		<div className='speciality-block'>
			<div className='items-cloud'>
				{
					currentSpecialities.map((item: MySpecialityT) => {
						return (
							<div className='single-speciality' key={item.id}>
								<div>{item.name}</div>
								<div>
									<SmallButton
										disableRipple={true}
										onClick={() => {
											const specIds = currentSpecialities
												.filter(spec => spec.id !== item.id)
												.map(spec => spec.id);
											removeSpeciality(specIds)
										}}
									>
										<CloseIcon/>
									</SmallButton>
								</div>
							</div>
						)
					})
				}
			</div>
			<div className='search-speciality'>
				<StyledAutocompleteRoot
					{...getRootProps()}
					className={!focused ? 'focused' : undefined}
				>
					<StyledInput
						{...inputProps}
						value={search}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setSearch(event.target.value)
						}}
					/>
				</StyledAutocompleteRoot>
				<label htmlFor="speciality">Start typing speciality</label>

				{groupedOptions.length > 0 ? (
					<InfiniteLoaderBlock
						hasNextPage={hasNextPage}
						isNextPageLoading={isNextPageLoading}
						items={items}
						loadNextPage={loadNextPage}
						wrapperClassName={classes.listbox}
						getOptionProps={getOptionProps}
						groupedOptions={groupedOptions}
						listboxProps={getListboxProps()}
						handleSelect={setSpeciality}
					/>
				) : null}
			</div>
		</div>
	)
};

export default SpecialityBlock;