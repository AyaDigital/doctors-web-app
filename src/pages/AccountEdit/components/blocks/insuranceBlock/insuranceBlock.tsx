import React, {useState, useEffect, useRef, FC} from 'react';
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DispatchProp, connect } from 'react-redux';
import { Dispatch, Action } from '@reduxjs/toolkit';
import AppStateType from 'redux/types';
import InfiniteLoaderBlock from 'components/inputs/InFiniteLoader';
import { TextFieldStyles } from 'components/controls/textfields';
import { DispatchPropT, DictionaryT, InsuranceCompanyT, SelectedAttachmentT, UploadFileT } from 'types';
import CloseIcon from 'images/Icons/closeIcon';
import { SmallButton } from 'components/controls/buttons';
import { StyledAutocompleteRoot, StyledInput } from 'components/controls/textfields';
import { setUploadAttachmentRequest } from 'redux/modules/attachments/actions/attachments';
import {
	getInsuranceListRequest, clearScrollToken
} from 'redux/modules/dictionaries/actions/dictionaries'
import {
	useStyles,
	CommonCancelButton,
} from '../../../../PatientAccountEdit/components/blocks';
import './insuranceBlock.scss';

export const StyledTextField = styled(TextField)(Object.assign(TextFieldStyles, {width: '100%'}));
export const CancelButton = styled(Button)(Object.assign({color: 'rgba(255, 84, 74, 1)'}, CommonCancelButton));
export const DatesButton = styled(Button)({
	backgroundColor: 'transparent',
	padding: 0,
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type InsuranceWindowT = {
	error?: Error | string,
	companies: DictionaryT<InsuranceCompanyT>,
	doctorsInsuranceCompanies: any[],
	setDoctorsInsurance: (arg: number) => Action<any>,
	removeDoctorsInsuranceCompanies: (arg: number[]) => Action<any>
} & DispatchProps;

const InsuranceWindow: React.FC<InsuranceWindowT> = ({
	error = '',
	companies,
	doctorsInsuranceCompanies,
	getCompanies,
	setDoctorsInsurance,
	removeDoctorsInsuranceCompanies,
	clearToken
}) => {
	const classes = useStyles();
	const [items, setItems] = useState<InsuranceCompanyT[]>([]);
	const [apiError, setApiError] = useState<Error | string>('');
	const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
	const [hasNextPage, setHasNextPage] = useState<boolean>(false);
	const [search, setSearch] = useState<string>('');

	useEffect(() => {
		setApiError(error);
	}, [error])

	useEffect(() => {
		if (apiError) {
			const timeout = setTimeout(() => {
				setApiError('');
			}, 3000);

			return () => clearTimeout(timeout);
		}
	}, [apiError]);

	const loadNextPage = async (...args: any) => {
		try{
			getCompanies(undefined);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSelect = (arg: number) => {
		setDoctorsInsurance(arg)
	}

	useEffect(() => {
		setItems(companies.data! || [])
		setIsNextPageLoading(false);
	}, [companies]);

	useEffect(() => {
		setHasNextPage(!companies.isLastPage);
	}, [companies])

	useEffect(() => {
		getCompanies(undefined);
	}, []);

	useEffect(() => {
		clearToken();
		getCompanies(search);
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
		if (items?.length === 0) {
			loadNextPage();
		}
	}, [items]);
	const inputProps = Object.assign({}, {...getInputProps()});

	return (
		<>
			<div className='items-cloud'>
				{
					doctorsInsuranceCompanies.map((item: any) => {
						return (
							<div className='single-speciality' key={item.id}>
								<div>{item.name}</div>
								<div>
									<SmallButton
										disableRipple={true}
										onClick={() => {removeDoctorsInsuranceCompanies([item.id])}}
									>
										<CloseIcon/>
									</SmallButton>
								</div>
							</div>
						)
					})
				}
			</div>
			<div className='insurance-companies-loader'>
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
				<label htmlFor="insurance">Start typing insurance company name</label>

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
						handleSelect={handleSelect}
					/>
				) : null}
			</div>
		</>
	);
}

const mapStateToProps  = (state: AppStateType) => ({
	error: state.profile.error,
	companies: state.dictionaries.insuranceCompanies
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	uploadPhoto: (data: UploadFileT | any) => dispatch(setUploadAttachmentRequest(data)),
	getCompanies: (data: string | undefined) => dispatch(getInsuranceListRequest(data)),
	clearToken: () => dispatch(clearScrollToken())
})
export default connect(mapStateToProps, mapDispatchToProps)(InsuranceWindow);