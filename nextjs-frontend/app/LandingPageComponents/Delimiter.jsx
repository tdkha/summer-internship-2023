import Image from 'next/image'
import star_delimiter from '../../public/img/star_delimiter.png'
export default function Delimiter() {
    return (
      <div className='w-60%'>
        <Image
        src={star_delimiter}
        alt="star_delimiter "
      />
      </div>
        

    )
  }