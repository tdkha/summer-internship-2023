import Image from 'next/image'
import sun from '../../public/img/sun.svg'
export default function Delimiter2() {
    return (
        <Image
        className='light-spark-delimiter'
        src={sun}
        alt="star_delimiter "
      />

    )
  }