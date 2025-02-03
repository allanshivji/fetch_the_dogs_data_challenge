import { FC } from 'react';

interface ZipCodeFilterProps {
  handleAllZipCodes: (zipCodes: string[]) => void 
}

const ZipCodeFilter:FC<ZipCodeFilterProps> = () => {

  return (
    <>
    Zip Code Filter
    </>
  )
}

export default ZipCodeFilter;