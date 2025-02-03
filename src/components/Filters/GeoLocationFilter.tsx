import { FC } from 'react';

interface GeoLocationFilterProps {
  handleAllZipCodes: (zipCodes: string[]) => void 
}

const GeoLocationFilter: FC<GeoLocationFilterProps> = () => {

  return (
    <>
    GeoLocationFilter Filter
    </>
  )
}

export default GeoLocationFilter;