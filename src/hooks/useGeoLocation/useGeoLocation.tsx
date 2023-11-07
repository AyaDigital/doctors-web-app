import { useState, useEffect } from 'react';
import { LatLngT } from 'types';
import { setDefaults, fromLatLng, OutputFormat, fromAddress } from "react-geocode";

export default function useGeoLocation() {
  const [locations, setLocations] = useState<string[]>();
  const [latlng, setCurrentLatLng] = useState<LatLngT>();
  const [currentlatlng, setCurrentAddressLatLng] = useState<LatLngT>();

  useEffect(() => {
	setDefaults({
		key: process.env.REACT_APP_GOOGLE,
		language: "en",
		region: "es",
		outputFormat: OutputFormat.JSON
	});

	return () => {
		setLocations([])
	};
  }, []);

  const setLatLng = ({lat, lng}: LatLngT) => {
	fromLatLng(lat, lng)
		.then(({ results }: { results: string[] }) => {
			setCurrentLatLng({lat, lng})
			setLocations(results)
		})
		.catch(console.error);
  }
  const setCurrentAddressPoint = (address: string) => {
	fromAddress(address)
		.then(({ results }: {results: any[]}) => {
		const { lat, lng } = results[0].geometry.location;
		setCurrentAddressLatLng({lat, lng});
	})
	.catch(console.error);
  }
  return {locations, latlng, setLatLng, setLocations, setCurrentAddressPoint, currentlatlng};
}
