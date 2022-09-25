import React from 'react';

import { Image } from '../../atoms/image.atom';

const CustomIcon = ({ src }) => {
  return (
    <Image src={src} alt="icon"/>
  )
}

export default CustomIcon;