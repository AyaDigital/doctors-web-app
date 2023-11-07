import React, {useEffect, useState} from 'react';
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import uniq from 'lodash/uniq';
import { ActionWithAnyProp, LanguageT } from 'types';
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from 'images/Icons/closeIcon';
import InfiniteLoaderBlock from 'components/inputs/InFiniteLoader';
import { SmallButton } from 'components/controls/buttons';
import { StyledAutocompleteRoot, StyledInput } from '../../common';
import './languagesBlock.scss';

type LanguagesBlockProps = {
	hasNextPage?: boolean,
	isNextPageLoading?: boolean,
	isLastPage: boolean,
	getLanguages: (arg: string | undefined) => ActionWithAnyProp,
	languages?: LanguageT[],
	myLanguages: LanguageT[],
	setLanguage: (arg: number[]) => void,
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

const LanguagesBlock: React.FC<LanguagesBlockProps> = ({
        getLanguages,
		clearToken,
		languages = [],
		myLanguages,
		isLastPage,
		setLanguage
	}: LanguagesBlockProps
) => {
	const classes = useStyles();
	// const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;
	const [items, setItems] = useState<LanguageT[]>([]);
	const [currentItems, setCurrentItems] = useState<LanguageT[]>([]);
	const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
	const [hasNextPage, setHasNextPage] = useState<boolean>(false);
	const [search, setSearch] = useState<string>('');

	const loadNextPage = async (...args: any) => {
		try{
			getLanguages(undefined);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setCurrentItems(myLanguages);
		setSearch('');
	}, [myLanguages.length])

	useEffect(() => {
		setItems(languages)
		setIsNextPageLoading(false);
	}, [languages]);

	useEffect(() => {
		setHasNextPage(!isLastPage);
	}, [isLastPage])

	useEffect(() => {
		clearToken();
		getLanguages(search);
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

	const handleRemoveLanguage = (id: number) => {
		const updated = currentItems.filter(item => item.id !== id);
		const current = updated.map(item => item.id);
		setLanguage(uniq(current));
	}

	return (
		<div className='speciality-block'>
			<div className='items-cloud'>
				{
					currentItems.map((item: LanguageT) => {
						return (
							<div className='single-speciality' key={item.id}>
								<div>{item.name}</div>
								<div>
									<SmallButton
										disableRipple={true}
										onClick={() => handleRemoveLanguage(item.id)}
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
				<label htmlFor="speciality">Start typing language</label>

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
						handleSelect={(id) => {
							const current = myLanguages.map(item => item.id);
							current.push(id);
							setLanguage(uniq(current))
						}}
					/>
				) : null}
			</div>
		</div>
	)
};

export default LanguagesBlock;
