import copyright from '../../images/copyright.png'

export default function Footer(){
    return(
        <>
            <div className=" flex items-center justify-center gap-[50px] mb-[20px]">
                <div className='flex items-center gap-[12px]'>
                    <img className='w-[20px] h-[20px]' src={copyright} alt="copyright" />
                    <h1 className='text-gray-400 mt-[-1px]'>copyright 2025</h1>
                </div>
                <a href="#!" className='text-gray-400 underline'>Политика конфиденциальности</a>
            </div>
        </>
    )
}