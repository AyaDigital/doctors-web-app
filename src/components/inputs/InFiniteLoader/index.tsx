import React from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

type InfiniteLoaderBlockProps = {
	hasNextPage: boolean,
	wrapperClassName: string,
	isNextPageLoading: boolean,
	items: any[],
	groupedOptions: any[],
	listboxProps: unknown,
	loadNextPage: () => void,
	getOptionProps: ({ option, index }: { option: any; index: number; }) => unknown,
	handleSelect: (arg: number) => void,
	fieldname?: string
}

const InfiniteLoaderWrapper: React.FC<InfiniteLoaderBlockProps> =({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
  wrapperClassName,
  getOptionProps,
  groupedOptions,
  listboxProps,
  fieldname = 'name',
  handleSelect
}) => {

  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  const isItemLoaded = (index: number) => !hasNextPage || index < items.length;

  const Item = ({ index, style }: {index: number, style: any}) => {
	if (!isItemLoaded(index)) {
		return <li style={style}>Loading...</li>;
	} else if (!groupedOptions || index >= groupedOptions.length) {
		return <li style={style} />;
	} else {
		const option = groupedOptions[index];
		const name = option.name || "no name";
		const optionProps: any = getOptionProps({ option, index });
		const { onClick } = optionProps;
		return (
			<li
				style={style}
				{...(optionProps as any)}
				onClick={(e: any) => {
					handleSelect(Number(option.id))
					onClick(e)
				}}
			>
				{name}
			</li>
		);
	}
  };

  return (
	<InfiniteLoader
		isItemLoaded={isItemLoaded}
		itemCount={itemCount}
		loadMoreItems={loadMoreItems}
	>
		{({ onItemsRendered, ref }) => (
			<div {...(listboxProps as any)}>
				<List
					className={wrapperClassName}
					height={150}
					itemCount={itemCount}
					itemSize={30}

					onItemsRendered={onItemsRendered}
					ref={ref}
					width={508}
					
					innerElementType="ul"
				>
					{Item}
				</List>
			</div>
		)}
	</InfiniteLoader>
  );
}

export default InfiniteLoaderWrapper;
