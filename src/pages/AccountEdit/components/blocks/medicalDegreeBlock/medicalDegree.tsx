import React, {useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import { DispatchPropT, MedicalDegreeT } from '../../../../../types';
import { Action } from '@reduxjs/toolkit';
import CloseIcon from '../../../../../images/Icons/closeIcon';
import { StyledAutoComplete } from '../../common';
import { SmallButton } from '../../../../../components/controls/buttons';
import './medicalDegree.scss';

type SpecialityBlockProps = {
    medicalDegrees: MedicalDegreeT[],
    myMedicalDegrees: MedicalDegreeT[],
	addMyDegrees: (arg: number[]) => Action<any>,
	removeMyDegrees: (arg: number[]) => Action<any>
};

const MedicalDegreeBlock: React.FC<SpecialityBlockProps> = ({
    medicalDegrees,
    myMedicalDegrees,
	addMyDegrees,
	removeMyDegrees
}) => {
	const [items, setItems] = useState<MedicalDegreeT[]>([]);
	const [currentDegrees, setCurrentDegrees] = useState<MedicalDegreeT[]>([]);
	const [search, setSearch] = useState<string>('');

	useEffect(() => {
		setCurrentDegrees(myMedicalDegrees);
		setSearch('')
	}, [myMedicalDegrees])

	useEffect(() => {
		setItems(medicalDegrees);
	}, [medicalDegrees]);

	return (
		<div className='degree-block'>
			<div className='items-cloud'>
				{
					currentDegrees.map((item: MedicalDegreeT) => {
						return (
							<div className='single-degree' key={item.id}>
								<div>{item.name}</div>
								<div>
									<SmallButton
										disableRipple={true}
										onClick={() => removeMyDegrees([item.id])}
									>
										<CloseIcon/>
									</SmallButton>
								</div>
							</div>
						)
					})
				}
			</div>
			<div className='search-degree'>
				<StyledAutoComplete
					options={items}
					getOptionLabel={(option: unknown) => {
						return `${(option as MedicalDegreeT).name} (${(option as MedicalDegreeT).code})`;
					}}
					onChange={(_, object) => {
						if (object) {
							addMyDegrees([(object as MedicalDegreeT).id])
						}
					}}
					renderInput={(params) => {
						return <TextField
									{...params}
									label="Start typing the degree"
									variant="outlined"
									inputProps={{
										...params.inputProps,
										onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
											setSearch(event.target.value)
										},
										value: search
									}}
								/>
					}
				}
				/>

			</div>
		</div>
	)
};

export default MedicalDegreeBlock;