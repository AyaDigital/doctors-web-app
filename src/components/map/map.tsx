import React, {useState, type CSSProperties, useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import cn from 'classnames';
import './map.scss';
import Overlay from 'material-ui/internal/Overlay';

const centerDefault = {
	lat: 42.2805177,
	lng: -97.5556044
};

type PositionT = {
	lat?: number,
	lng?: number,
	content?: string,
	action?: () => void,
	text?: string
}

type markerProps = {
	lat?: number,
	lng?: number,
	content: string | undefined,
	text?: string | undefined,
	action?: () => void
}

type overlayProps = {
	lat?: number,
	lng?: number,
	content?: React.ComponentProps<'div'>
}

type MapBlockProps = {
	className?: string,
	style?: CSSProperties,
	center?: PositionT,
	zoom?: number,
	marker?: string,
	markers?: PositionT[],
	onClick?: (arg: any) => void,
	overlay?: overlayProps
  };

const MapBlock: React.FC<MapBlockProps> = ({
	center = centerDefault, marker = undefined, markers, zoom = 15, className = '', onClick = () => {}, overlay
}) => {
		const [centerPoint, setCenterPoint] = useState<PositionT>(centerDefault);

		useEffect(() => {
			if (center.lat && center.lng) {
				setCenterPoint(center)
			}
		}, [center]);

		const MARKER_POSITION: PositionT = {
			lat: centerPoint.lat || 0,
			lng: centerPoint.lng || 0
		};

		const AnyReactComponent = ({ content, action = () => {}, text = '' }: markerProps) => {
			return (
				<a
					onClick={(event: React.ChangeEvent<unknown>) => {
						event.stopPropagation();
						action();
					}}
					title={text}
				>
					<div className='marker-photo'><img src={content} /></div>
				</a>
			);
		}
		const AnyOverlay = ({ content }: overlayProps) => <div>{content}</div>

		return (
			<div className={cn({'containerStyle': true, [className]: className})} >
				<GoogleMapReact
					bootstrapURLKeys={{ key: (process.env.REACT_APP_GOOGLE as string) }}
					center={MARKER_POSITION}
					onClick={onClick}
					zoom={zoom}
				>
					{
						marker ? (
							<AnyReactComponent
								lat={centerPoint.lat}
								lng={centerPoint.lng}
								content={marker}
							/>
						) : null
					}
					{
						markers ? (markers.map((marker, index) => (
							<AnyReactComponent
								key={index}
								lat={marker.lat}
								lng={marker.lng}
								content={marker.content}
								action={marker.action}
								text={marker.text}
							/>
						))) : null
					}
					{
						zoom ? (
							<AnyOverlay
								lat={overlay?.lat || 0}
								lng={overlay?.lng || 0}
								content={overlay?.content}
							/>
						) : null
					}
				</GoogleMapReact>
			</div>
		)
}

export default MapBlock;